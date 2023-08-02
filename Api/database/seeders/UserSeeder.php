<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 100; $i++){
            User::create([
                'nome' => $faker->name,
                'telefone' => $faker->phoneNumber(),
                'email' => $faker->email(),
                'idade' => $faker->numberBetween(1, 120),
                'sexo' => $faker->randomLetter(),
                'cidade' => $faker->city(),
                'estado' => $faker->randomLetter() . $faker->randomLetter(),
                'bio' => $faker->text(),
                'password' => $faker->password(),
                'admin' => $faker->boolean(10)
            ]);
        }
    }
}
