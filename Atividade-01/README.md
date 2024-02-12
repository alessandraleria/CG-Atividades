# Atividade 1

## Este é um projeto simples em TypeScript que utiliza a biblioteca canvas para gerar imagens PPM e PNG de gradientes, círculos e quadrados. O código está estruturado em classes e possui uma configuração mínima para execução.

### Pré-requisitos

    Node.js (instalação disponível em https://nodejs.org/)
    npm (geralmente instalado junto com o Node.js)

```bash
# Instale as dependências:

$ npm install

# Para gerar as imagens, utilize o seguinte comando:

$ npm run start
```

Este comando irá transpilar o código TypeScript para JavaScript, e em seguida, executar o script principal (src/index.ts). As imagens serão geradas e salvas na pasta src/out.

### Estrutura do Projeto

    src/index.ts: Script principal que instancia a classe ImageGenerator e chama os métodos para gerar as imagens.
    src/utils/generator.ts: Classe responsável por gerar e salvar imagens. Contém métodos para criar gradientes, círculos e quadrados.
    src/out/ppm: Pasta onde as imagens PPM são salvas.
    src/out/png: Pasta onde as imagens PNG são salvas.

### Detalhes Técnicos

O projeto utiliza a biblioteca canvas para criar e manipular imagens. As imagens são geradas em formato PPM (Portable Pixmap) e salvos como PNG diretamente utilizando a biblioteca fs para manipulação de arquivos.