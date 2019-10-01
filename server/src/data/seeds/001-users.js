exports.seed = function(knex, Promise) {
  return knex("users  ").insert([
    {
      email: "jacob1angulo@gmail.com",
      password: "$2a$05$3KA3WH/rGpib/OY4gcC/m.TINKwomxSTBmNVmpdAIFSijpAk/2vLK",
      full_name: "Jacob Angulo",
      banner_image_url:
        "https://social-app-profile-pictures.s3.amazonaws.com/1567544109007",
      profile_image_url:
        "https://social-app-profile-pictures.s3.amazonaws.com/1565739673480",
      bio: "Hi I'm jake"
    },
    {
      email: "ellie@email.com",
      password: "$2a$05$3KA3WH/rGpib/OY4gcC/m.TINKwomxSTBmNVmpdAIFSijpAk/2vLK",
      full_name: "Elizabeth Angulo",
      banner_image_url:
        "https://social-app-profile-pictures.s3.amazonaws.com/1567544109007",
      profile_image_url:
        "https://social-app-profile-pictures.s3.amazonaws.com/1565740955062",
      bio: "Hi I'm ellie"
    },
    {
      email: "david@email.com",
      password: "$2a$05$3KA3WH/rGpib/OY4gcC/m.TINKwomxSTBmNVmpdAIFSijpAk/2vLK",
      full_name: "David Angulo",
      banner_image_url:
        "https://social-app-profile-pictures.s3.amazonaws.com/1567544109007",
      profile_image_url:
        "https://social-app-profile-pictures.s3.amazonaws.com/1565741004256",
      bio: "Hi I'm david"
    },
    {
      email: "shelley@email.com",
      password: "$2a$05$3KA3WH/rGpib/OY4gcC/m.TINKwomxSTBmNVmpdAIFSijpAk/2vLK",
      full_name: "Shelley Teehan",
      banner_image_url:
        "https://social-app-profile-pictures.s3.amazonaws.com/1567544109007",
      profile_image_url:
        "https://social-app-profile-pictures.s3.amazonaws.com/1565741043733",
      bio: "Hi I'm shelley"
    }
  ]);
};
