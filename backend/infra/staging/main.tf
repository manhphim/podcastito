module "podcastito-VPC" {
  source = "./modules/vpc"

  vpc_cidr            = local.vpc_cidr
  vpc_tags            = var.vpc_tags
  availability_zones  = local.availability_zones
  public_subnet_cidrs = local.public_subnet_cidrs
}

module "podcastito-application" {
  source = "./modules/application"

  podcastito_vpc_id         = module.podcastito-VPC.vpc_id
  podcastito_public_subnets = module.podcastito-VPC.public_subnets
}


