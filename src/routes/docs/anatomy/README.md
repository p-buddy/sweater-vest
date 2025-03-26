# Anatomy of a Sweater Vest Test

Jump to the [complete example](#complete) below if you want to see what a Sweater Vest test looks like in its entirety.

[](?register=recipe(pkg)&region=remap(,'''$lib_slash_index.js''','''sweater-vest''',_))

[](?register=recipe(no-body)&region=splice-end(body,5),splice-start(body,-6),replace(body,'...'))

[](?register=recipe(no-snippet)&region=replace(snippet,'...'))

## `Sweater` Component

Begin a [Sweater Vest](https://www.npmjs.com/package/sweater-vest) test by utilizing the `Sweater` component imported from the `"sweater-vest"` package.

[](./+page.svelte?apply=recipe(pkg,no-body,no-snippet))

## `vest` Snippet

The `Sweater` component expects a `vest` snippet to be defined which takes a single argument (which is called `pocket` as a convention).

[](?register=recipe(trim-pocket)&region=trim(pocket))

[](?register=recipe(no-pocket-type)&region=splice-end(type,1),replace(type,...))

[](?register=recipe(no-markup)&region=replace(markup,...))

[](./+page.svelte?region=extract(component)&apply=recipe(no-body,no-pocket-type,trim-pocket,no-markup))

### `pocket` Argument Type

You as the test author will determine the type of the `pocket` argument based on the requirements of your test. The type should include:

- Any elements and/or componets within your markup that you want to `bind:this` to in order to interact with in your test's [body](#body-function-prop). For example:

[](?register=recipe(no-template)&region=replace(templated,...))

[](./+page.svelte?apply=recipe(trim-pocket,no-template)&region=extract(snippet),trim-start(bind),single-line(pocket),splice-end(pocket,-1),replace(value,...))

- Any data that will be utilized within your markup (which will be initilalized / manipulated by your test's [body](#body-function-prop)). For example:

[](./+page.svelte?apply=recipe(trim-pocket)&region=extract(snippet,para),trim-start(bind),single-line(pocket),splice-end(pocket,-1),replace(container,'...,'),splice-start(bind,-11),replace(bind,'...-unangle-'))

## `body` Function Prop

[](./+page.svelte?region=extract(component),replace(snippet,...),replace(implementation,...),splice-start(body,1))

## Complete 

[](./+page.svelte?apply=recipe(trim-pocket,pkg)&region=splice-start(body,1),single-line(pocket),splice-end(pocket,-1),splice-start(bind,1))