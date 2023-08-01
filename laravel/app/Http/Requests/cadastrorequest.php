<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use PharIo\Manifest\Email;

class cadastrorequest extends FormRequest
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
            'nome'=>[
                'required',
                'string',
                'max:200',
                'min:1',    
            ],
            'email'=>[
                'required',
                'email',
                'string',
                'max:200',
                'min:3',
                'unique:users',
            ],
            'senha'=>[
                'required',
                'string',
                'min:8',
                'max:20',
                'required_with:confirma_senha',
                'same:confirma_senha',
                
            ],
            'confirma_senha'=>[
                'required',
                'string',
                'min:8',
                'max:20',
            ],
            'telefone'=>[
                'required',
                'numeric',
                'min_digits:11',
                'max_digits:11'
                
            ]
                
        ];
    }
    public function messages()
    {
        return [
            'nome.required' => 'o campo nome é obrigatório',
            'nome.max' => 'o nome não pode ter mais que 200 caracteres',
            'email.required' => 'o campo email é obrigatório',
            'email.email' => 'o email deve ser válido',
            'email.max' => 'o email deve ter no máximo 200 caracteres',
            'email.unique' => 'o email digitado ja está em uso',
            'senha.required' => 'o campo senha é obrigatório',
            'senha.required_with' => 'a senha deve ser confirmada',
            'senha.same' => 'a confirmação de senha deve ser igual a senha',
            'senha.min' => 'a senha deve ter no mínimo 8 caracteres',
            'senha.max' => 'a senha deve ter no máximo 20 caracteres',
            'confirma_senha.required' => 'a confirmação da senha é obrigatória',
            'telefone.required' => 'o campo telefone é obrigatório',
            'telefone.numeric' => 'o telefone deve ser um número',
            'telefone.min' => 'o telefone deve ter 11 dígitos',
            'telefone.max' => 'o telefone deve ter 11 dígitos',
        ];
    }
}
