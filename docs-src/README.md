# mouse-stalker docs

## dev

`../` 階層のnpm-packageへリンクし、docsのローカル開発環境を起動する。

```zsh
% npm run dev
```

## precommit

commitの際には、上位階層でlintやbuildを一式対応する。

```
% cd ../
% npm run precommit
% cd docs

```

