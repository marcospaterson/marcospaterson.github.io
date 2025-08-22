---
layout: post
title: "Complete Guide: Setting Up Apache Kafka with Monitoring on Debian from Scratch"
date: 2025-08-09 09:00:00 +0000
categories: [database, kafka, apache, debian, devops, monitoring]
tags: [kafka, apache-kafka, debian, docker, prometheus, grafana, monitoring, devops, production]
author: Marcos Paterson
excerpt: "A comprehensive production deployment guide for Apache Kafka 3.7.0 with KRaft mode, complete monitoring stack, automation scripts, and security hardening on Debian from scratch."
---

Setting up a production-ready Apache Kafka cluster with comprehensive monitoring can be complex, involving multiple components from container orchestration to observability stacks. In this comprehensive guide, I'll walk you through creating a robust Apache Kafka deployment on Debian with full monitoring capabilities from the ground up.

This isn't just another "quick start" tutorial – it's a complete production deployment guide with automation scripts, monitoring dashboards, security hardening, and testing strategies that have been refined through real-world deployments.

## What You'll Build

By the end of this guide, you'll have:

- Production-ready Apache Kafka 3.7.0 cluster with KRaft mode  
- Comprehensive monitoring with Prometheus, Grafana, and specialized exporters  
- Automated deployment scripts for reproducible setups  
- Security hardening with firewall and access controls  
- Topic management automation for different use cases  
- Performance testing and validation tools  
- Complete observability stack with dashboards and alerting

## Architecture Overview

Our setup follows a containerized approach with comprehensive observability:

```
┌─────────────────────────────────────────┐
│ Debian VM (YOUR_SERVER_IP)              │
│ ┌─────────────────────────────────────┐ │
│ │ Docker Host                         │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ Apache Kafka 3.7.0 (KRaft)      │ │ │
│ │ │ Port: 9092 (external)           │ │ │
│ │ │ Port: 9094 (internal)           │ │ │
│ │ │ Persistent Volume: kafka_data   │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ Monitoring Stack                │ │ │
│ │ │ ┌─────────────────────────────┐ │ │ │
│ │ │ │ Prometheus (9090)           │ │ │ │
│ │ │ │ Grafana (3000)              │ │ │ │
│ │ │ │ Kafka Exporter (9308)       │ │ │ │
│ │ │ │ Node Exporter (9100)        │ │ │ │
│ │ │ └─────────────────────────────┘ │ │ │
│ │ └─────────────────────────────────┘ │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

This architecture provides:

- Isolation through containerization
- Scalable messaging with Apache Kafka KRaft mode
- Complete observability with metrics collection
- Data persistence via Docker volumes
- Network isolation with custom Docker networks

## Quick Start

For those who want to dive in immediately:

```bash
# Clone the repository
git clone https://github.com/marcospaterson/svc-kafka.git
cd svc-kafka

# Deploy the complete stack
docker compose -f docker-compose.kafka.yml up -d

# Create topics
./scripts/create-topics.sh

# Run smoke tests
./scripts/smoke-test.sh

# Check consumer lag
./scripts/check-lag.sh
```

That's it! You'll have a fully configured Apache Kafka cluster with monitoring in about 10 minutes.

But let's dive deeper into each component to understand what's happening and why.

## Prerequisites

Before we begin, ensure you have:

- Debian 12 (Bookworm) VM with root access
- Minimum 4GB RAM and 40GB storage
- Network connectivity and sudo privileges
- Docker and Docker Compose installed
- Basic Linux administration knowledge

## Phase 1: System Foundation Setup

### Understanding the Docker Infrastructure

The foundation starts with a well-configured Docker environment. Our setup uses modern Docker Compose syntax without version declarations, following current best practices:

```yaml
services:
  kafka:
    image: bitnami/kafka:3.7.0
    container_name: kafka
    restart: unless-stopped
    ports:
      - "9092:9094"
      - "9094:9094"
    networks:
      - kafka-network
```

This isn't just basic containerization – it includes:

- Health checks for automatic recovery
- Network isolation with custom networks
- Volume persistence for data durability
- Resource limits for stable operation

### Apache Kafka in KRaft Mode

One of the most significant architectural decisions is using KRaft mode instead of traditional Zookeeper. Here's the configuration that makes it work:

```yaml
environment:
  KAFKA_CFG_NODE_ID: 1
  KAFKA_CFG_PROCESS_ROLES: controller,broker
  KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093
  KAFKA_CFG_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093,EXTERNAL://:9094
  KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,EXTERNAL://YOUR_SERVER_IP:9094
  KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,EXTERNAL:PLAINTEXT
  KAFKA_CFG_CONTROLLER_LISTENER_NAMES: CONTROLLER
```

Why KRaft mode matters:

- Eliminates Zookeeper dependency reducing complexity
- Better metadata handling and faster recovery
- Simplified security configuration
- Improved partition scaling capabilities

### Network Configuration Strategy

The network setup is critical for production deployments:

```yaml
networks:
  kafka-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

This provides:

- Isolated network segment for Kafka services
- Predictable IP addressing within containers
- Controlled communication between components
- Security boundary for the messaging platform

## Phase 2: Comprehensive Monitoring Stack

### Prometheus Configuration

Prometheus serves as the metrics collection hub, configured to scrape multiple targets:

```yaml
prometheus:
  image: prom/prometheus:latest
  container_name: prometheus
  ports:
    - "9090:9090"
  volumes:
    - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
  command:
    - '--config.file=/etc/prometheus/prometheus.yml'
    - '--storage.tsdb.path=/prometheus'
    - '--web.console.libraries=/etc/prometheus/console_libraries'
```

The Prometheus configuration targets multiple exporters:

```yaml
scrape_configs:
  - job_name: 'kafka-exporter'
    static_configs:
      - targets: ['kafka-exporter:9308']
    scrape_interval: 15s

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
    scrape_interval: 15s
```

This setup ensures:

- Kafka-specific metrics collection
- System-level resource monitoring
- Configurable scraping intervals
- Persistent time-series storage

### Specialized Kafka Monitoring

The kafka-exporter provides detailed insight into Kafka operations:

```yaml
kafka-exporter:
  image: danielqsj/kafka-exporter:latest
  container_name: kafka-exporter
  ports:
    - "9308:9308"
  command:
    - --kafka.server=kafka:9092
    - --web.listen-address=:9308
```

Key metrics exposed include:

- Topic partition counts and status
- Consumer group lag monitoring
- Broker availability and leadership
- Message throughput and error rates

### Grafana Dashboard Integration

Grafana provides the visualization layer with pre-configured dashboards:

```yaml
grafana:
  image: grafana/grafana:latest
  container_name: grafana
  ports:
    - "3000:3000"
  environment:
    - GF_SECURITY_ADMIN_PASSWORD=admin123
  volumes:
    - ./grafana:/var/lib/grafana/dashboards
    - ./grafana/provisioning:/etc/grafana/provisioning
```

The dashboard includes panels for:

- Kafka broker health and status
- Topic throughput and partition distribution
- Consumer lag trending and alerting
- System resource utilization

## Phase 3: Topic Management and Configuration

### Automated Topic Creation

The topic creation script handles different message patterns:

```bash
#!/bin/bash
# create-topics.sh - Automated topic provisioning

create_topic() {
    local topic_name="$1"
    local partitions="$2"
    local replication_factor="$3"
    shift 3
    local configs="$@"

    docker exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
        --create \
        --bootstrap-server localhost:9092 \
        --topic "$topic_name" \
        --partitions "$partitions" \
        --replication-factor "$replication_factor" \
        $configs
}
```

Each topic is optimized for its specific use case:

### High-Throughput Streaming Topics

```bash
# Quotes topic - High volume market data
create_topic "quotes" 6 1 \
    --config retention.ms=3600000 \
    --config compression.type=lz4 \
    --config cleanup.policy=delete
```

Features:

- 6 partitions for parallel processing
- 1-hour retention for real-time data
- LZ4 compression for speed
- Delete cleanup policy for storage efficiency

### Compacted State Topics

```bash
# Pricing results - Latest values only
create_topic "pricing-results" 3 1 \
    --config retention.ms=86400000 \
    --config cleanup.policy=compact \
    --config min.cleanable.dirty.ratio=0.1
```

Benefits:

- Compaction preserves latest values per key
- Reduced storage requirements
- Fast state reconstruction
- Configurable compaction thresholds

### Audit and Compliance Topics

```bash
# Audit logs - Long-term retention
create_topic "audit-logs" 2 1 \
    --config retention.ms=2678400000 \
    --config compression.type=gzip \
    --config cleanup.policy=delete
```

This ensures:

- 31-day retention for compliance
- GZIP compression for storage efficiency
- Immutable audit trail
- Regulatory requirement fulfillment

## Phase 4: Testing and Validation Framework

### Comprehensive Smoke Testing

The smoke test script validates all system components:

```bash
#!/bin/bash
# smoke-test.sh - End-to-end validation

test_kafka_connectivity() {
    echo "Testing Kafka connectivity..."

    # Test metadata retrieval
    if kcat -b YOUR_SERVER_IP:9092 -L > /dev/null 2>&1; then
        echo "✓ Kafka metadata accessible"
    else
        echo "✗ Kafka connectivity failed"
        return 1
    fi
}
```

The testing framework includes:

- Container health verification
- Network connectivity testing
- Topic creation validation
- Producer/consumer functionality
- Monitoring endpoint checks

### Producer/Consumer Testing

```bash
test_producer_consumer() {
    local test_topic="test-topic"
    local test_message="Test message from Apache Kafka"

    # Send test message
    echo "$test_message" | kcat -P -b YOUR_SERVER_IP:9092 -t "$test_topic"

    # Verify message receipt
    received=$(kcat -C -b YOUR_SERVER_IP:9092 -t "$test_topic" -o beginning -e | tail -1)

    if [ "$received" = "$test_message" ]; then
        echo "✓ Producer/Consumer test passed"
    else
        echo "✗ Message verification failed"
    fi
}
```

This validates:

- Message production capabilities
- Consumer group functionality
- End-to-end message delivery
- Data integrity verification

### Monitoring System Validation

```bash
test_monitoring_endpoints() {
    # Test Prometheus metrics
    if curl -s http://YOUR_SERVER_IP:9090/metrics | grep -q "prometheus_"; then
        echo "✓ Prometheus metrics available"
    fi

    # Test Kafka exporter
    if curl -s http://YOUR_SERVER_IP:9308/metrics | grep -q "kafka_brokers"; then
        echo "✓ Kafka exporter functional"
    fi

    # Test Grafana accessibility
    if curl -s http://YOUR_SERVER_IP:3000/api/health | grep -q "ok"; then
        echo "✓ Grafana dashboard accessible"
    fi
}
```

## Phase 5: Operational Management Tools

### Consumer Lag Monitoring

The lag checking script provides operational visibility:

```bash
#!/bin/bash
# check-lag.sh - Consumer group monitoring

check_consumer_lag() {
    echo "Checking consumer group lag..."

    docker exec kafka /opt/bitnami/kafka/bin/kafka-consumer-groups.sh \
        --bootstrap-server localhost:9092 \
        --describe --all-groups
}
```

This provides:

- Real-time lag monitoring
- Consumer group status
- Partition assignment details
- Performance troubleshooting data

### Security and ACL Management

```bash
#!/bin/bash
# setup-acls.sh - Access control configuration

setup_user_acls() {
    local username="$1"
    local topic_pattern="$2"

    # Create user with specific topic access
    docker exec kafka /opt/bitnami/kafka/bin/kafka-acls.sh \
        --bootstrap-server localhost:9092 \
        --add \
        --allow-principal User:$username \
        --operation Read \
        --operation Write \
        --topic $topic_pattern
}
```

Security features include:

- Role-based access control
- Topic-level permissions
- User authentication
- Audit trail logging

## Configuration Deep Dive

### Apache Kafka Tuning

The Bitnami Kafka image allows extensive configuration through environment variables:

```yaml
environment:
  # Performance tuning
  KAFKA_CFG_NUM_NETWORK_THREADS: 8
  KAFKA_CFG_NUM_IO_THREADS: 16
  KAFKA_CFG_SOCKET_SEND_BUFFER_BYTES: 102400
  KAFKA_CFG_SOCKET_RECEIVE_BUFFER_BYTES: 102400
  KAFKA_CFG_SOCKET_REQUEST_MAX_BYTES: 104857600

  # Log configuration
  KAFKA_CFG_LOG_RETENTION_HOURS: 168
  KAFKA_CFG_LOG_SEGMENT_BYTES: 1073741824
  KAFKA_CFG_LOG_CLEANUP_INTERVAL_MS: 300000
```

These optimizations provide:

- Enhanced network throughput
- Improved I/O performance
- Appropriate buffer sizing
- Efficient log management

### Monitoring Configuration

The Grafana dashboard configuration is provisioned automatically:

```yaml
# grafana/provisioning/dashboards/kafka.yml
apiVersion: 1

providers:
  - name: 'kafka-dashboard'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    editable: true
    options:
      path: /var/lib/grafana/dashboards
```

Dashboard panels include:

- Broker availability and leadership
- Topic throughput and partition count
- Consumer lag trends and alerting
- System resource utilization

## Performance Optimization

### Memory and CPU Tuning

For different system configurations:

**4GB RAM System:**
```yaml
environment:
  KAFKA_HEAP_OPTS: "-Xmx1G -Xms1G"
  KAFKA_CFG_NUM_IO_THREADS: 4
  KAFKA_CFG_NUM_NETWORK_THREADS: 4
```

**8GB RAM System:**
```yaml
environment:
  KAFKA_HEAP_OPTS: "-Xmx2G -Xms2G"
  KAFKA_CFG_NUM_IO_THREADS: 8
  KAFKA_CFG_NUM_NETWORK_THREADS: 8
```

**16GB+ RAM System:**
```yaml
environment:
  KAFKA_HEAP_OPTS: "-Xmx4G -Xms4G"
  KAFKA_CFG_NUM_IO_THREADS: 16
  KAFKA_CFG_NUM_NETWORK_THREADS: 16
```

### Storage Optimization

For SSD storage configurations:

```yaml
environment:
  # Optimize for SSD performance
  KAFKA_CFG_LOG_FLUSH_INTERVAL_MESSAGES: 10000
  KAFKA_CFG_LOG_FLUSH_INTERVAL_MS: 1000
  KAFKA_CFG_LOG_SEGMENT_BYTES: 536870912
```

## Troubleshooting Guide

### Common Issues and Solutions

**Container Startup Failures:**

```bash
# Check container logs
docker logs kafka

# Verify network connectivity
docker network inspect svc-kafka_kafka-network

# Check port conflicts
netstat -tlnp | grep 9092
```

**Topic Creation Issues:**

```bash
# Verify broker availability
docker exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
    --bootstrap-server localhost:9092 --list

# Check cluster metadata
kcat -b YOUR_SERVER_IP:9092 -L
```

**Monitoring Problems:**

```bash
# Test Prometheus scraping
curl -s http://YOUR_SERVER_IP:9090/targets

# Verify exporter functionality
curl -s http://YOUR_SERVER_IP:9308/metrics | grep kafka_brokers

# Check Grafana data sources
curl -s http://admin:admin123@YOUR_SERVER_IP:3000/api/datasources
```

### Performance Issues

```bash
# Monitor container resources
docker stats kafka

# Check topic throughput
docker exec kafka /opt/bitnami/kafka/bin/kafka-log-dirs.sh \
    --bootstrap-server localhost:9092 --describe

# Analyze consumer lag
./scripts/check-lag.sh
```

## Production Best Practices

### Security Hardening

1. **Network Security:**

```bash
# Restrict Kafka access to specific networks
sudo ufw allow from 192.168.1.0/24 to any port 9092
sudo ufw allow from 192.168.1.0/24 to any port 3000
```

2. **Container Security:**

```yaml
security_opt:
  - no-new-privileges:true
user: "1001:1001"
read_only: true
```

### High Availability Setup

For production deployments, consider multi-broker configurations:

```yaml
services:
  kafka-1:
    image: bitnami/kafka:3.7.0
    environment:
      KAFKA_CFG_NODE_ID: 1
      KAFKA_CFG_PROCESS_ROLES: controller,broker

  kafka-2:
    image: bitnami/kafka:3.7.0
    environment:
      KAFKA_CFG_NODE_ID: 2
      KAFKA_CFG_PROCESS_ROLES: controller,broker

  kafka-3:
    image: bitnami/kafka:3.7.0
    environment:
      KAFKA_CFG_NODE_ID: 3
      KAFKA_CFG_PROCESS_ROLES: controller,broker
```

### Backup and Recovery

```bash
# Backup Kafka data
docker run --rm -v kafka_data:/data -v $(pwd):/backup \
    alpine tar czf /backup/kafka-backup-$(date +%Y%m%d).tar.gz /data

# Monitor disk usage
df -h | grep kafka_data
```

## Real-World Use Cases

### High-Frequency Trading Platform

```bash
# Market data topic - Ultra-low latency
create_topic "market-data" 12 1 \
    --config retention.ms=1800000 \
    --config compression.type=lz4 \
    --config min.insync.replicas=1
```

### Event Sourcing Architecture

```bash
# Event store - Long retention
create_topic "events" 6 1 \
    --config retention.ms=-1 \
    --config cleanup.policy=compact \
    --config compression.type=gzip
```

### Microservices Communication

```bash
# Service commands - Moderate throughput
create_topic "commands" 3 1 \
    --config retention.ms=86400000 \
    --config cleanup.policy=delete
```

## Integration Examples

### Application Integration

**Python Producer:**

```python
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['YOUR_SERVER_IP:9092'],
    value_serializer=lambda x: json.dumps(x).encode('utf-8')
)

# Send message
producer.send('quotes', {
    'symbol': 'AAPL',
    'price': 150.25,
    'timestamp': '2025-08-09T10:30:00Z'
})
```

## Lessons Learned from Real-World Implementation

During the development and deployment of this Kafka setup, several important discoveries were made:

### Image Selection Matters

**Issue:** The official Apache Kafka Docker image required complex configuration and often failed to start properly in KRaft mode.

**Solution:** Switching to the Bitnami Kafka image provided:
- More reliable KRaft mode configuration
- Better environment variable support
- Comprehensive documentation
- Production-ready defaults

### Path Configuration Challenges

**Issue:** Different Kafka distributions place binaries in different locations, causing script failures.

**Solution:** All scripts were updated to use Bitnami-specific paths:

```bash
# Bitnami path structure
/opt/bitnami/kafka/bin/kafka-topics.sh
/opt/bitnami/kafka/bin/kafka-consumer-groups.sh
```

### Monitoring Integration Complexity

**Issue:** Getting comprehensive Kafka metrics required careful coordination between multiple exporters.

**Solution:** A layered monitoring approach:
- Node Exporter for system metrics
- Kafka Exporter for Kafka-specific metrics
- Custom JMX configuration for internal Kafka metrics

> **Pro Tip:** Always test your complete stack in a staging environment before production deployment. The interaction between containers, networking, and monitoring can reveal issues not apparent in individual component testing.

## Conclusion

Setting up a production-ready Apache Kafka cluster with comprehensive monitoring involves many moving pieces, but with the right approach and tools, it becomes manageable and reliable. This guide provides you with:

✅ Complete containerized deployment with Docker Compose
✅ Production-hardened Kafka configuration with KRaft mode
✅ Comprehensive monitoring with Prometheus and Grafana
✅ Automated topic management and testing scripts
✅ Security considerations and best practices
✅ Troubleshooting guides for common issues
✅ Performance tuning for different workloads

### Key Takeaways

**Simplicity Through Automation** - Automated scripts reduce deployment complexity and ensure consistency
**Monitoring is Essential** - Comprehensive observability prevents issues before they impact production
**Testing Validates Everything** - Smoke tests and validation scripts catch problems early
**Security from Day One** - Build security into the architecture rather than adding it later
**Documentation Saves Time** - Well-documented configurations and procedures accelerate troubleshooting

### What's Next?

Now that you have a solid Apache Kafka foundation, consider:

- Implementing Schema Registry for message evolution
- Adding multi-broker setup for true high availability
- Integrating SSL for encrypted communication
- Creating custom monitoring dashboards for specific use cases
- Implementing automated backup and disaster recovery
- Adding integration with stream processing frameworks

### Get the Complete Setup

The full repository with all scripts, configurations, and documentation is available on GitHub:

🔗 [Apache Kafka Setup Repository](https://github.com/marcospaterson/svc-kafka)

The repository includes:

- All automation scripts with error handling
- Production-ready Docker Compose configurations
- Comprehensive monitoring dashboards
- Testing and validation frameworks
- Troubleshooting guides and documentation

### Questions and Support

If you run into issues or have questions about this setup:

- Open an issue on the GitHub repository
- Check the troubleshooting section in the documentation
- Review the smoke test output for specific error details

Remember: a well-configured Apache Kafka setup will serve your messaging needs reliably for years. Taking time to properly implement monitoring, testing, and automation upfront saves countless hours of troubleshooting later.

This guide represents practical experience deploying Apache Kafka in production environments. The configurations and scripts have been tested across multiple deployments and refined based on operational feedback.
