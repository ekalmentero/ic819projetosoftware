<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class editprodutocarrinhorequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'quantidade'=>[
                'required',
                'integer',
                'min:0',
                'max:2147483647'
            ],
        ];
    }
    public function messages()
    {
        return [
           
            'quantidade.required' => 'a quantidade de produtos no estoque é obrigatória',
            'quantidade.integer' => 'a quantidade de produtos deve ser um número inteiro',
            'quantidade.min' => 'o numero de produtos não pode ser menor que 0',
            'quantidade.max' => 'o numero de produtos não pode ser tão grande',
        ];
    }
}
