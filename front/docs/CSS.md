# CSS

In this document we take a look at what CSS is and how it can be applied to a publication in ChattyPub.

- [What is CSS](#what-is-css)
- [Rules](#rules)
- [Css in ChattyPub](#css-in-ChattyPub)
- [Uploading fonts](#uploading-fonts)
- [Print settings](#print-settings)

---

## What is CSS?

CSS (Cascading Style Sheets) is the language that allows you to style and layout HTML web pages. This article explains what CSS is, with some simple syntax examples, and also covers some key terms about the language.

Since this document relates specifically to ChattyPub, the focus is going to be on the parts of the language that are supported by this platform. Because CSS is specifically oriented towards styling HTML (and related languages like SVG and XML) you have to have a basic understanding of HTML.<sup>[1](#footnote1)</sup> Mozilla has an excellent [HTML introduction](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started).

At its heart, HTML is a fairly simple language made up of elements, which can be applied to pieces of text to give them different meaning in a document (Is it a paragraph? Is it a bulleted list? Is it part of a table?), structure a document into logical sections (Does it have a header? Three columns of content? A navigation menu?), and embed content such as images and videos into a page.
But what HTML does not do is speficy how these elements should look. That is where CSS comes in.

CSS can be used for very basic document text styling — for example changing the color and size of headings and links. It can be used to create layout — for example turning a single column of text into a layout with a main content area and a sidebar for related information. It can even be used for effects such as animation.
In ChattyPub we're mostly interested in the first part.

---

## Rules

#### _Elements and Classes_

In this section we will talk about CSS in general. ChattyPub uses a slight variation on it, but let's start with the basics.

CSS is a rule-based language — you define rules specifying groups of styles that should be applied to particular elements or groups of elements on your web page. For example "I want the main heading on my page to be shown as large red text."

The following code shows a very simple CSS rule that would achieve the styling described above:

```css
h1 {
  color: red;
  font-size: 20px;
}
```

The rule opens with a selector. This selects the HTML element that we are going to style. In this case we are styling all level one headings (`<h1>`) that appear on the page.

We then have a set of curly braces `{` `}`. Inside those will be one or more declarations, which take the form of property and value pairs. Each pair specifies a property of the element(s) we are selecting, then a value that we'd like to give the property. Each pair is followed by a semi-colon `;` to indicate the end of the property.

Before the colon, we have the property, and after the colon, the value. CSS properties have different allowable values, depending on which property is being specified. In our example, we have the color property, which can take various color values. We also have the font-size property. This property can take various size units as a value.

The example above will style all the `H1` elements on the page. You could also write a selector for all paragraphs (the selector would be `p`), images (`img`) or list items (`li`). This works as long as you want all of the elements of that type in your document to look the same. Most of the time that isn't the case and so you will need to find a way to select a subset of the elements without changing the others. The most common way to do this is to add a class to your HTML element and target that class.

Take this HTML:

```html
<ul>
  <li>Item one</li>
  <li class="special">Item two</li>
  <li>Item <em>three</em></li>
</ul>
```

To target the class of special you can create a selector that starts with a full stop character.

```css
.special {
  color: orange;
  font-weight: bold;
}
```

The peroid character in front of special tells the browser that we're creating a class selector.
You can apply the class of special to any element on your page that you want to have the same look as this list item.

### Units

In the `h1` example above, we set the following property: `font-size: 20px;`. This will set the font-size of all H1 headers to 20 pixels. But pixels are not the only units available. Some examples:

- `em` and `rem` - these relative units declare a size dependant on the font-size of the context they get used in. This can be a bit confusing if you're not used to it. Feel free to replace it with on of the values below.
- `px` - Pixels.
- `cm` and `in` - centimeters and inches. These units are mostly relevant in print context.
- `vw` and `vh` - so called viewport units, 100vw is exactly the height of the viewport (the part of the browser that shows the webpage). `vh` is the same, but for the height of the browser.
- `rgba(r,g,b,a)` strictly speaking not a unit but a function, but it sets the color and transparency of the foreground.

[More information on units](https://www.w3.org/Style/Examples/007/units.en.html).

---

## CSS in ChattyPub

When you react to a message in Zulip with an emoji, this emoji gets turned into a class in ChattyPub. So lets say you responded to a message with the strawberry 🍓 emoji. In ChattyPub the message will have class with that emoji as selector. (You can confirm this by rolling over the message, the emoji should popup on a overlay.) So now to style that message, you go to the `#rules` channel and add a message with the following content:

```css
🍓 {
  color: red;
}
```

It is very similar to the examples above. `🍓` is the selector, so the rule will apply to each message with a strawberry reaction. Then follows the block `{` and `}`. And in the block, there is property, `color: red;`.

_A small difference with regular CSS is that you don't need to add the period in front of the selector ChattyPub will handle that for you._

Because of the way Zulip handles the emoji reactions, not all emoji are available or sometimes they don't exactly correspond to the emoji you might type in the `#rules` channel. To help with sorting this out you can roll over a message in ChattyPub and see the reactions that are applied. Sometimes the translation is unavailable, in that case you'll see something like `:working_on_it:` instead of the emoji you expected. In that case remove your reaction and find an other emoji that does work.

### About formatting

You can't enter a tab character in Zulip and the indentation before the property in the rule isn't absolutely necessary. So feel free to leave it out. If you absolutely want to have the indentation, you could write the rule in your favorite editor and copy and paste it into Zulip. If you only want to style a single property you could have the whole rule on a single line like this: `🌕 { box-shadow: 0 0 20px rgba(255,0,0,0.5); }`,

_Don't forget the semi-colon at the end of the property line!_

### Advanced CSS

**Selecting HTML elements and other style rules**

The reaction/emoji method described above allows to make quick modifications to the style and layout of your publication. But besides this ChattyPub also allows you to style html elements like in regular CSS. To do this just enter your style rule. This snippet will give all HTML links a pink background color:

```css
a {
  background-color: pink;
}
```

You should be able to enter all regular CSS rules this way.

**Bypassing the parser** -_Work in progress_-

It is possible to bypass the parser and add arbitrary code to the CSS on the page. This allows you to add, for example, `@keyframes` for an animation or media queries. To do this send any message to the #rules channel and wrap the message in three backticks like this:

<code>
```
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}
```
</code>

---

## Uploading fonts

It is also possible to upload a custom font to the application. To do this, you send the font in a message to the #rules channel of the publication you want to use it in. You can use `.ttf`, `.otf` or `.woff` formats depending on the browser you are using. The mesage must only contain the font, no other text. ChattyPub will then automatically generate a @font-face rule for the font. The font-family name will be based on the filename.

Once uploaded the font should show up in the CSS rules section of ChattyPub. To use the font in a style rule, just copy/paste the `font-family: "font_name_ttf";` and add it to a rule in the #rules channel.

> Please only upload free or open-source fonts to our server!

## Print settings

To set the paper size we can use the special selector `@page`. The following snippet set the page size to A5.

```css
@page {
  size: 148mm 210mm;
}
```

Regrettably [browser support](https://caniuse.com/css-paged-media) for `@page` is spotty. Currently only MS Edge, Opera and Google Chrome will allow you to set page sizes etc.

[Pagedmedia.org](https://www.pagedmedia.org/pagedjs-sneak-peeks/) has an excellent explanation on using `@page`. The [Paged media module](https://developer.mozilla.org/en-US/docs/Web/CSS/Paged_Media) at Mozilla as well.

### page breaks

By default pages will automatically wrap to the next page. And ChattyPub adds a page break after each topic. If you want to force a page break you could write a rule for it, using the `page-break-after: always;` property:

```
📄 {
page-break-after: always;
}
```

For some of these rules it may be necessary to use the methods described under [Advanced CSS](#advanced-css) above to enter these rules.

## List of common and handy CSS properties

There are hundreds of CSS properties. Below is a small selection of some basic properties mostly focussed on layout and type representation, grouped by module.

### Backgrounds and borders

- [background-color](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)
- [border](https://developer.mozilla.org/en-US/docs/Web/CSS/border) - The border CSS property sets an element's border.
- [border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) - The border-radius CSS property rounds the corners of an element's outer border edge.
- [box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) - The box-shadow CSS property adds shadow effects around an element's frame.

### Color

- [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color) - The color CSS property sets the foreground color value of an element's text and text decorations.
- [opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity) - The opacity CSS property sets the opacity of an element. Opacity is the degree to which content behind an element is hidden, and is the opposite of transparency.

A colors value can defined in multiple ways:

- By [name/keyword](http://web.simmons.edu/~grovesd/comm244/notes/week3/css-colors#keywords) - `color: red;` will make your text red.
- By [hex value](http://web.simmons.edu/~grovesd/comm244/notes/week3/css-colors#hex) - `color: #ff0000;` also red.
- Or as a [function](http://web.simmons.edu/~grovesd/comm244/notes/week3/css-colors#rgba), which allows transparency. - `color: rgba(255,0,0,0.5);` red, but 50% transparent.

### Box model

- [margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) - The margin property sets the margin area on all four sides of an element. Margin refers to space between different elements.
- [padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) - The padding property sets the padding area on all four sides of an element at once. Padding refers to the spacing inside the border of an element.

### Fonts

- [font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) - The font-family CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.

You can choose one of the following generic fonts. Which exact font will be used is dependant on your computers' settings.

```css
font-family: serif;
font-family: sans-serif;
font-family: monospace;
font-family: cursive;
font-family: fantasy;
```

It is also possible to specify an exact font name, but it will only be used if it is actually available on your system.
For example following statement will try to use Helvetica if available, but will fallback on a generic sans-serif font if not. (Note the quotes around the font name).

```css
font-family: "Helvetica Neue", sans-serif;
```

Also see the section on uploading fonts below.

- [font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) - The font-size CSS property sets the size of the font. Changing the font size also updates the sizes of the font size-relative <length> units, such as em, ex, and so forth.
- [font-style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style) - The font-style CSS property sets whether a font should be styled with a normal, italic, or oblique face from its font-family.
- [font-weigh](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) - The font-weight CSS property sets the weight (or boldness) of the font. The weights available depend on the font-family that is currently set.
- [line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height) - The line-height CSS property sets the height of a line box. It's commonly used to set the distance between lines of text.

### Text

- [letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing) - The letter-spacing CSS property sets the horizontal spacing behavior between text characters.
- [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) - The text-align CSS property sets the horizontal alignment of the content inside a block element.
- [text-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform) - The text-transform CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized.
- [white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) - The white-space CSS property sets how white space inside an element is handled.
- [word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break) - The word-break CSS property sets whether line breaks appear wherever the text would otherwise overflow its content box.
- [word-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing) - The word-spacing CSS property sets the length of space between words and between tags.
- [text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow) - The text-shadow CSS property adds shadows to text.

### Transforms

- [rotate](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate) - The rotate CSS property allows you to specify rotation of elements
- [scale](https://developer.mozilla.org/en-US/docs/Web/CSS/scale) - The scale CSS property allows you to specify the scale (size) of elements
- [translate](https://developer.mozilla.org/en-US/docs/Web/CSS/translate) - The translate CSS property allows you to specify translation transforms (position relative to where it originally was) of elements.

<a name="footnote1">1</a>: I've borrowed shamelessly from Mozilla to make this text: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS and https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML
