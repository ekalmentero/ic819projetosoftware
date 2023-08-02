<?php

namespace App\Http\Controllers;

use App\Models\User;
use Tymon\JWTAuth\JWTGuard;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use function PHPUnit\Framework\isEmpty;

use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function register(Request $request) {

        $user = User::where('email', $request['email']) -> first();

        if($user) {
            $response['status'] = 0;
            $response['message'] = 'This email already exists';
            $response['code'] = 409;
        } else {
            if ($request->hasFile('fotoPerfil')) {
                $file = $request->file('fotoPerfil');
                if ($file->isValid()) {
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $filePath = $file->storeAs('uploads', $fileName, 'public');
                } else {
                    $response['status'] = 0;
                    $response['message'] = 'Error uploading the file';
                    $response['code'] = 500;
                    return response()->json($response);
                }
            } else {
                $filePath = null; // Default value if no file was uploaded
            }

            $user = User::create([
                'nome'      => $request->nome,
                'email'     => $request->email,
                'password'  => bcrypt($request->password),
                'telefone'  => $request->telefone,
                'idade'     => $request->idade,
                'sexo'      => $request->sexo,
                'cidade'    => $request->cidade,
                'estado'    => $request->estado,
                'bio'       => $request->bio,
                'emprestimosConcedidos' => $request->emprestimosConcedidos,
                'emprestimosRequeridos' => $request->emprestimosRequeridos,
                'nota'      => $request->nota,
                'fotoPerfil' => $filePath,
                'admin'     => $request->admin
            ]);
            $response['status'] = 1;
            $response['message'] = 'User Registered Successfully';
            $response['code'] = 200;
        }
        return response()->json($response);
    }

    public function login(Request $request) {
        $credentials = $request->only('email', 'password');
        try {
            if(!JWTAuth::attempt($credentials)) {
                $response['status'] = 0;
                $response['code'] = 401;
                $response['data'] = null;
                $response['message'] = 'Email or password is incorrect';
                return response()->json($response);
            }
        } catch(JWTException $e) {
            $response['data'] = null;
            $response['code'] = 500;
            $response['message'] = 'Could not create token';
            return response()->json($response);
        }

        $user = auth()->user();
        $data['token'] = auth()->claims([
            'user_id' => $user->id,
            'email' => $user->email,
            'nome' => $user->nome,
            'telefone' => $user->telefone,
            'idade' => $user->idade,
            'sexo' => $user->sexo,
            'cidade' => $user->cidade,
            'estado' => $user->estado,
            'bio' => $user->bio,
            'emprestimosConcedidos' => $user->emprestimosConcedidos,
            'emprestimosRequeridos' => $user->emprestimosRequeridos,
            'nota' => $user->nota,
            'fotoPerfil' => $user->fotoPerfil,
        ])->attempt($credentials);

        $response['data'] = $data;
        $response['status'] = 1;
        $response['code'] = 200;
        $response['message'] = 'Log in Successfully';
        return response()->json($response);
    
    }

    public function usuarioPorId($id){
        $usuario = User::where('id', $id)->get();

        if($usuario->isEmpty()){
            $response['status'] = 0;
            $response['message'] = 'Usuario não encontrado';
            $response['code'] = 404;
            return response()->json($response);
        }
        return response()->json($usuario);
    }

    public function getFotoPerfil($filename)
    {
        $path = 'uploads/' . $filename;

        if (Storage::exists($path)) {
            $file = Storage::get($path);
            $type = Storage::mimeType($path);

            return response($file, 200)
                ->header('Content-Type', $type);
        } else {
            return response('Imagem não encontrada', 404);
        }
    }

    public function emprestimosConcedidos($id, Request $request)
    {
        $users = User::find($id);
    
        if (!$users) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }
    
        $users->update($request->only("emprestimosConcedidos"));
    
        $users->save();
    
        return response()->json(['code' => 200, 'status' => 1, 'message' => 'Empréstimo concedido com sucesso', 'data' => $users]);
    }

    public function emprestimosRequeridos($id, Request $request)
    {
        $users = User::find($id);
    
        if (!$users) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }
    
        $users->update($request->only("emprestimosRequeridos"));
    
        $users->save();
    
        return response()->json(['code' => 200, 'status' => 1, 'message' => 'Empréstimo requerido com sucesso', 'data' => $users]);
    }

    public function notaUser($id, Request $request)
    {
        $users = User::find($id);
    
        if (!$users) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }
    
        $users->update($request->only("nota"));
    
        $users->save();
    
        return response()->json(['code' => 200, 'status' => 1, 'message' => 'Empréstimo requerido com sucesso', 'data' => $users]);
    }

    public function atualizaUser($id, Request $request){
        $user = User::find($id);

        $fieldsToUpdate = [
            'nome', 'email', 'telefone', 'idade', 'sexo',
            'cidade', 'estado', 'bio'
        ];

        foreach ($fieldsToUpdate as $field) {
            $user->update($request->only($field));
        }

        $user->save();

        return response()->json([
            'code' => 200, 'status' => 1,
            'message' => 'Usuario atualizado com sucesso',
            'data' => $user
        ]);
    }
}
