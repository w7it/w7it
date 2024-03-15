output "arn" {
  value = resource.aws_ssm_parameter.this.arn
}

output "name" {
  value = var.name
}

output "secret_value" {
  sensitive = true
  value     = resource.aws_ssm_parameter.this.value
}
