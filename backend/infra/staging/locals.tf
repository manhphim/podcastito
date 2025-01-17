locals {
  vpc_cidr            = "10.1.0.0/16"
  availability_zones  = ["us-east-1a", "us-east-1b"]
  public_subnet_cidrs = ["10.1.1.0/24", "10.1.2.0/24"]
}