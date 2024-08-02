resource "aws_security_group" "podcastitoWebserverSecurityGroup" {
  name        = "allow_ssh_http"
  description = "Allow ssh http inbound traffic"
  vpc_id      = var.podcastito_vpc_id

  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      from_port   = ingress.value["port"]
      to_port     = ingress.value["port"]
      protocol    = ingress.value["proto"]
      cidr_blocks = ingress.value["cidr_blocks"]
    }
  }

  ingress {
    from_port   = 5500
    to_port     = 5500
    protocol    = "tcp"
    security_groups = [aws_security_group.podcastitoLbSecurityGroup.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "podcastitoWebserverStagingSecurityGroup"
    Project = "podcastito TF Demo"
  }
}

resource "aws_security_group" "podcastitoLbSecurityGroup" {
  name        = "allow_ssh_http_lb"
  description = "Allow ssh http lb inbound traffic"
  vpc_id      = var.podcastito_vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5500
    to_port     = 5500
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "podcastitoLbStagingSecurityGroup"
    Project = "podcastito TF Demo"
  }
}

resource "aws_key_pair" "podcastitoKeyPair" {
  key_name   = local.key_name
  public_key = file(local.public_key_path)
  tags = {
    Name    = "podcastitoKeyPairStaging"
    Project = "podcastito TF Demo"
  }
}

resource "aws_lb" "podcastitoLoadBalancer" {
  load_balancer_type = "application"
  subnets            = [var.podcastito_public_subnets[0].id, var.podcastito_public_subnets[1].id]
  security_groups    = [aws_security_group.podcastitoLbSecurityGroup.id]
  tags = {
    Name    = "podcastitoLoadBalancerStaging"
    Project = "podcastito TF Demo"
  }
}

resource "aws_lb_listener" "podcastitoLbListener1" {
  load_balancer_arn = aws_lb.podcastitoLoadBalancer.arn

  port     = 80
  protocol = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.podcastitoTargetGroup1.id
    type             = "forward"
  }
}

resource "aws_lb_listener" "podcastitoLbListener2" {
  load_balancer_arn = aws_lb.podcastitoLoadBalancer.arn

  port     = 5500
  protocol = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.podcastitoTargetGroup2.id
    type             = "forward"
  }
}

resource "aws_lb_target_group" "podcastitoTargetGroup1" {
  name     = "alb-target-group-1-staging"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.podcastito_vpc_id

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 15
    timeout             = 3
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
  tags = {
    Name    = "podcastitoTargetGroupStaging"
    Project = "podcastito TF Demo"
  }
}

resource "aws_lb_target_group" "podcastitoTargetGroup2" {
  name     = "alb-target-group-2-staging"
  port     = 5500
  protocol = "HTTP"
  vpc_id   = var.podcastito_vpc_id

  health_check {
    path                = "/api/v1/health"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 15
    timeout             = 3
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
  tags = {
    Name    = "podcastitoTargetGroupStaging"
    Project = "podcastito TF Demo"
  }
}

resource "aws_lb_target_group_attachment" "podcastito-server1" {
  target_group_arn = aws_lb_target_group.podcastitoTargetGroup2.arn
  target_id        = aws_instance.podcastito-server1.id
  port             = 5500
}

resource "aws_lb_target_group_attachment" "podcastito-server2" {
  target_group_arn = aws_lb_target_group.podcastitoTargetGroup2.arn
  target_id        = aws_instance.podcastito-server2.id
  port             = 5500
}
resource "aws_lb_target_group_attachment" "podcastito-server3" {
  target_group_arn = aws_lb_target_group.podcastitoTargetGroup1.arn
  target_id        = aws_instance.podcastito-server1.id
  port             = 80
}

resource "aws_lb_target_group_attachment" "podcastito-server4" {
  target_group_arn = aws_lb_target_group.podcastitoTargetGroup1.arn
  target_id        = aws_instance.podcastito-server2.id
  port             = 80
}

resource "aws_eip_association" "eip_assoc_podcastito-server1" {
  instance_id   = aws_instance.podcastito-server1.id
  allocation_id = aws_eip.podcastito-server1-eip.id
}

resource "aws_eip" "podcastito-server1-eip" {
  tags = {
    Name    = "podcastito-server1-eip-staging"
    Project = "podcastito TF Demo"
  }
}

resource "aws_instance" "podcastito-server1" {
  ami                         = local.ami_id
  instance_type               = local.instance_type
  key_name                    = local.key_name
  subnet_id                   = var.podcastito_public_subnets[0].id
  security_groups             = [aws_security_group.podcastitoWebserverSecurityGroup.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash -xe
              sudo su 
              yum update -y
              yum install -y curl 
              yum install -y docker
              service docker start
              usermod -a -G docker ec2-user
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<h1>Podcastito Server 1</h1>" > /var/www/html/index.html
              EOF
              
  tags = {
    name = "podcastito-server1-staging"
  }
}

resource "aws_eip_association" "eip_assoc_podcastito-server2" {
  instance_id   = aws_instance.podcastito-server2.id
  allocation_id = aws_eip.podcastito-server2-eip.id
}

resource "aws_eip" "podcastito-server2-eip" {
  tags = {
    Name    = "podcastito-server2-eip-staging"
    Project = "podcastito TF Demo"
  }
}

resource "aws_instance" "podcastito-server2" {
  ami                         = local.ami_id
  instance_type               = local.instance_type
  key_name                    = local.key_name
  subnet_id                   = var.podcastito_public_subnets[1].id
  security_groups             = [aws_security_group.podcastitoWebserverSecurityGroup.id]
  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash -xe
              sudo su 
              yum update -y
              yum install -y curl 
              yum install -y docker
              service docker start
              usermod -a -G docker ec2-user
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<h1>Podcastito Server 2</h1>" > /var/www/html/index.html
              EOF
  
  tags = {
    name = "podcastito-server2-staging"
  }
}
