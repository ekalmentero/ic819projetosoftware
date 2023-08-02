<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->name,
            'telefone' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'idade' => $this->faker->numberBetween(1, 120),
            'sexo' => $this->faker->randomLetter(),
            'cidade' => $this->faker->city(),
            'estado' => $this->faker->randomLetter() . $this->faker->randomLetter(),
            'bio' => $this->faker->text(),
            'password' => $this->faker->password(),
            'admin' => $this->faker->boolean(10)
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
