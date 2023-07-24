<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    protected $resetUrl;

    public function __construct($token, $resetUrl)
    {
        $this->token = $token;
        $this->resetUrl = $resetUrl;
    }
    /**
     * Create a new notification instance.
     */

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Redefinição de senha')
            ->greeting('Olá!')
            ->line('Você está recebendo este e-mail porque nós recebemos uma solicitação de redefinição de senha para sua conta.')
            ->action('Redefinir senha', $this->resetUrl)
            ->line('Se você não solicitou uma redefinição de senha, nenhuma ação adicional é necessária.')
            ->salutation('Atenciosamente, ' . config('app.name'));
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}

