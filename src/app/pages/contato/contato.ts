import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contato',
  imports: [FormsModule],
  templateUrl: './contato.html'
})
export class Contato {
  sendWhatsApp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { nome, email, telefone, assunto, mensagem } = form.value;
    const text = `Nome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nAssunto: ${assunto}\nMensagem: ${mensagem}`;
    const url =
      'https://api.whatsapp.com/send?phone=5581992589544&text=' +
      encodeURIComponent(text);
    window.open(url, '_blank');
  }
}
