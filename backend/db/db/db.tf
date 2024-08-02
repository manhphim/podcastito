resource "aws_security_group" "podcastitoDBSecurityGroup" {
  name   = "podcastito-db-security-group"
  vpc_id = var.podcastito_vpc_id

  ingress {
    from_port = 27017
    to_port   = 27017
    protocol  = "tcp"
    cidr_blocks = [
      var.podcastito_private_subnet_cidrs[0],
      var.podcastito_private_subnet_cidrs[1]
    ]
  }
  tags = {
    Name    = "podcastitoDBSecurityGroup"
    Project = "podcastito TF Demo"
  }
}


resource "aws_instance" "Database1" {      
  ami                         = local.ami_id
  instance_type               = local.instance_type
  key_name                    = local.key_name
  subnet_id                   = var.podcastito_private_subnets[2].id
  security_groups             = [aws_security_group.podcastitoDatabaseSecurityGroup.id]
  associate_public_ip_address = true

  user_data = file("${path.module}/init-db.sh")
}
