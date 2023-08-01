<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class verificaatendente
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth()->check()){
            if(Auth()->user()->usertype=="atendente"){
                return $next($request);
            }else if(Auth()->user()->usertype=="administrador"){
                return redirect()->route('administrador-index');
            }else if(Auth()->user()->usertype=="cliente"){
                return redirect()->route('index');
            }
            
        }else{
            return redirect()->route('index');
        }
    }
}
