# Central de Monitoramento — CAM 01

Página estática para GitHub Pages, com visual de painel de monitoramento e um único vídeo MP4 reproduzido continuamente.

## Arquivos

```text
.
├── index.html
├── styles.css
├── app.js
└── assets/
    ├── camera-01.mp4
    └── poster.jpg
```

O vídeo foi girado para corrigir a orientação da gravação original. A página não utiliza bibliotecas, fontes, APIs ou serviços externos.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo, `central-monitoramento`).
2. Envie todos os arquivos e a pasta `assets` para a raiz do repositório, preservando os nomes e a estrutura.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, depois clique em **Save**.
6. Aguarde a publicação indicada pelo GitHub Pages e acesse o endereço apresentado nessa tela.

## Observações

- O vídeo inicia automaticamente sem áudio, pois essa é a forma mais compatível com as políticas de autoplay dos navegadores. O botão **Áudio desligado** permite ativar o som.
- O atributo `loop` mantém o vídeo em repetição contínua. A ausência de um intervalo perceptível também depende do comportamento do navegador ao retornar ao primeiro quadro do arquivo.
- A data e a hora exibidas são as do dispositivo de quem acessa a página.
- GitHub Pages publica o conteúdo de forma pública. Não envie gravações privadas, imagens de pessoas sem autorização ou conteúdo que não possa ser disponibilizado publicamente.
