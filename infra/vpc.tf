data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "rds" {
  description = "Controls access to RDS"
  vpc_id      = data.aws_vpc.default.id
  name        = "w7it-main-rds"

  ingress {
    protocol    = "tcp"
    from_port   = "5432"
    to_port     = "5432"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
