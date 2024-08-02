variable "vpc_tags" {
  description = "Tags for VPC"
  type        = map(any)
  default = {
    Name    = "podcastito-vpc-prod"
    Project = "Podcastito"
  }
}

