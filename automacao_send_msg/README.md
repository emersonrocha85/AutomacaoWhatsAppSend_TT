# Automacao WhatsApp Send

Este projeto utiliza o Selenium e o **undetected-chromedriver** para enviar mensagens automatizadas via WhatsApp Web.

## 📌 Pré-requisitos
Antes de rodar o script, certifique-se de ter os seguintes itens instalados:
- **Python 3.11 ou superior**
- **Google Chrome** (versão mais recente)
- **ChromeDriver compatível com sua versão do Chrome**

## 🚀 Instalação

Siga os comandos abaixo para instalar as dependências necessárias:

```sh
# Instalar o Selenium
pip install selenium

# Instalar o WebDriver Manager para gerenciar o ChromeDriver automaticamente
pip install webdriver-manager

# Instalar o Undetected ChromeDriver para evitar detecção do WhatsApp Web
pip install undetected-chromedriver

# Atualizar todas as dependências do Selenium para garantir compatibilidade
pip install --upgrade selenium webdriver-manager undetected-chromedriver

# Se nao estiver funcionando o robo, utlize esse comando abaixo.

pip install --upgrade setuptools
pip install distutils
pip install --upgrade setuptools undetected-chromedriver


```



## 🔧 Como Usar

1. **Abra o Google Chrome e acesse o WhatsApp Web**
   - Certifique-se de estar logado na conta que deseja usar.
2. **Execute o script**
   ```sh
   python automacaott.py
   ```
3. **Escaneie o QR Code no WhatsApp Web** (caso necessário) e pressione Enter.
4. O script enviará mensagens automaticamente para os números especificados.

## 📌 Observações
- O WhatsApp pode bloquear automações excessivas. **Evite enviar mensagens repetitivas**.
- Caso o ChromeDriver esteja desatualizado, execute:
  ```sh
  pip install --upgrade webdriver-manager
  ```
- Se houver erros de compatibilidade, atualize o Google Chrome para a versão mais recente.

## 📞 Suporte
Se precisar de ajuda, sinta-se à vontade para abrir uma issue ou entrar em contato.

---
🚀 **Desenvolvido por [Seu Nome]**

