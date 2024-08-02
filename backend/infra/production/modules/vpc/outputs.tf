output "vpc_id" {
  value = aws_vpc.podcastito-VPC.id
}

output "public_subnets" {
  description = "Will be used by Application Server Module to set subnet_ids"
  value = [
    aws_subnet.podcastito-PublicSubnet1,
    aws_subnet.podcastito-PublicSubnet2
  ]
}
