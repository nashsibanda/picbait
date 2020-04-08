class AddLowercaseSlugToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :api_users, :slug, :string, null: false
    add_index :api_users, :slug, unique: true
    #Ex:- add_index("admin_users", "username")
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
