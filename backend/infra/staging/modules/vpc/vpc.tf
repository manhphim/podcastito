# Create a VPC
resource "aws_vpc" "podcastito-VPC" {
  instance_tenancy = "default"
  cidr_block       = var.vpc_cidr
  tags             = var.vpc_tags
}

resource "aws_internet_gateway" "podcastito-IGW" {
  vpc_id = aws_vpc.podcastito-VPC.id
  tags = {
    Name    = "podcastito-igw-staging"
    Project = "Podcastito"
  }
}

resource "aws_subnet" "podcastito-PublicSubnet1" {
  vpc_id            = aws_vpc.podcastito-VPC.id
  cidr_block        = var.public_subnet_cidrs[0]
  availability_zone = var.availability_zones[0]
  tags = {
    Name    = "podcastito-PublicSubnet1-staging"
    Project = "Podcastito"
  }
}
resource "aws_subnet" "podcastito-PublicSubnet2" {
  vpc_id            = aws_vpc.podcastito-VPC.id
  cidr_block        = var.public_subnet_cidrs[1]
  availability_zone = var.availability_zones[1]
  tags = {
    Name    = "podcastito-PublicSubnet2-staging"
    Project = "Podcastito"
  }
}

resource "aws_route_table" "podcastito-PublicRT" {
  vpc_id = aws_vpc.podcastito-VPC.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.podcastito-IGW.id
  }
  tags = {
    Name    = "podcastito-PublicRT-staging"
    Project = "Podcastito"
  }
}

resource "aws_route_table_association" "podcastito-PublicRTassociation1" {
  subnet_id      = aws_subnet.podcastito-PublicSubnet1.id
  route_table_id = aws_route_table.podcastito-PublicRT.id
}
resource "aws_route_table_association" "podcastito-PublicRTassociation2" {
  subnet_id      = aws_subnet.podcastito-PublicSubnet2.id
  route_table_id = aws_route_table.podcastito-PublicRT.id
}
