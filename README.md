# Sobre o projeto

## Instalando as dependências

Para instalar as dependências necessárias, é necessário ter o Node.js instalado localmente. Abra o terminal na pasta raiz do projeto e execute o seguinte comando:

```bash
npm install
```

Após a conclusão da instalação das dependências, você poderá executar o projeto localmente utilizando o seguinte comando:

```bash
npm run dev
```

Essa ação permitirá que a aplicação seja executada como uma página web no endereço http://localhost:3000, acessível por meio do navegador de sua escolha.

## Estruturação

O Nextjs, a partir de sua versão 13, introduziu a "app router" que é a pasta raiz para as páginas, onde cada pasta que possui um arquivo "page.tsx" a qual representa uma rota no navegador. Além de outra palavras reservadas como layout, error, loading, .. que também já possuem suas funcionalidades. Ademais, todo e qualquer outro arquivo dentro da app router são componentes, ou seja, partes de códigos reutilizáveis.

Pastas nomeadas (dessa forma) não possuem peso na hora do roteamento, são somente para fins de organização.