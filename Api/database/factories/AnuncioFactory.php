<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Anuncio>
 */
class AnuncioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'ativo' => $this->faker->boolean(90),
            'emprestado' => $this->faker->boolean(40),
            'dataInicioPrazo' => $this->faker->date(),
            'dataFimPrazo' => $this->faker->date(),
            'dataFim' => $this->faker->date(),
            'avaliacao' => $this->faker->numberBetween(1, 5),
            'relato' => $this->faker->sentence(rand(2, 6)),
        ];
    }
}
