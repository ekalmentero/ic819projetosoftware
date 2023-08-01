<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class loginrequest extends FormRequest
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
            'email'=>[
                'required',
                'email',
                'string',
                'max:200',
                'min:3',
            ],
            'senha'=>[
                'required',
                'string',
                'min:8',
                'max:20',
            ],
        ];
    }

    public function messages()
    {
        return[
            'email.required' => 'o campo email é obrigatório',
            'email.email' => 'o email deve ser válido',
            'email.max' => 'o email deve ter no máximo 200 caracteres',
            'senha.required' => 'o campo senha é obrigatório',
            'senha.min' => 'a senha deve ter no mínimo 8 caracteres',
            'senha.max' => 'a senha deve ter no máximo 20 caracteres',
        ];
    }
}
