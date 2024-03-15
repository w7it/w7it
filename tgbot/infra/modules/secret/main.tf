resource "aws_ssm_parameter" "this" {
  name  = "/${var.application_name}/${terraform.workspace}/${var.name}"
  type  = "SecureString"
  value = var.default_value

  lifecycle {
    ignore_changes = [
      value
    ]
  }

  tags = {
    Workspace   = terraform.workspace
    Application = var.application_name
    EnvVarName  = var.name
  }
}

