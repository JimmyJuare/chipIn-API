"""fixed cascade

Revision ID: dd512db4d442
Revises: a4073a72e64d
Create Date: 2023-10-15 18:28:06.261163

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dd512db4d442'
down_revision = 'a4073a72e64d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###