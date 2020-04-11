class AddSlugToApiUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :api_users, :slug, :string
    add_index :api_users, :slug, unique: true
  end
end
