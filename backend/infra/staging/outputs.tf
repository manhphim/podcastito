output "vpc_id" {
  value = module.podcastito-VPC.vpc_id
}

output "load_balancer_dns_name" {
  value = module.podcastito-application.load_balancer_dns_name
}
