import undetected_chromedriver as uc
import time

# Inicializa o WebDriver no modo "stealth"
driver = uc.Chrome()

# Abre o WhatsApp Web
driver.get("https://web.whatsapp.com/")
input("Escaneie o QR Code e pressione Enter para continuar...")

# Lista de números
numeros = ["+5511973275740",
            "+5511996458374"]

mensagem = "✨💅 CLIENTE PROSPECT 💖 💅 TESTE 👣 🤩 LEIA!!!🔥"

# Enviar mensagens
for numero in numeros:
    url = f"https://web.whatsapp.com/send?phone=55{numero}&text={mensagem}"
    driver.get(url)
    time.sleep(10)

    try:
        send_button = driver.find_element("xpath", '//span[@data-icon="send"]')
        send_button.click()
        print(f"Mensagem enviada para {numero}")
    except Exception as e:
        print(f"Erro ao enviar para {numero}: {e}")

    time.sleep(5)

print("Mensagens enviadas com sucesso!")
driver.quit()
