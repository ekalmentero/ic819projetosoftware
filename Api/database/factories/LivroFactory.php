<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Livro>
 */
class LivroFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titulo' => $this->faker->sentence(3),
            'autor' => $this->faker->name(),
            'sinopse' => $this->faker->sentence(10),
            #'capa' => $this->faker->filePath(),
            #comentei pq campo não encontrado
            'editora' => 'editora ' . $this->faker->lastName(),
            'edicao' => $this->faker->numberBetween(1, 10),
            'idioma' => $this->faker->languageCode(),
            'ano' => $this->faker->year(),
            'numPag' => $this->faker->numberBetween(75, 5001),
            'sbn10' => preg_replace('/[^0-9]/','',$this->faker->isbn10()),
            'sbn13' => preg_replace('/[^0-9]/','',$this->faker->isbn13())
        ];
    }
}
