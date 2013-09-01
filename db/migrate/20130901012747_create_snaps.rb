class CreateSnaps < ActiveRecord::Migration
  def change
    create_table :snaps do |t|
      t.references :poet
      t.references :poem

      t.timestamps
    end
  end
end
