# CSS

- [What is CSS](#css)
- [Rules](#rules)
- [Css in chatty-pub](#chatty-pub)
- [Typing Emoji](#emoji)

## What is CSS?

CSS (Cascading Style Sheets) is the language that allows you to style and layout HTML web pages. This article explains what CSS is, with some simple syntax examples, and also covers some key terms about the language.

Since this document relates specifically to **Chatty-pub**, the focus is going to be on the parts of the language that are supported by this platform. Because CSS is specifically oriented towards styling HTML (and related languages like SVG and XML) you have to have a basic understanding of HTML.<sup>[1](#footnote1)</sup> Mozilla has an excellent [HTML introduction](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started).

At its heart, HTML is a fairly simple language made up of elements, which can be applied to pieces of text to give them different meaning in a document (Is it a paragraph? Is it a bulleted list? Is it part of a table?), structure a document into logical sections (Does it have a header? Three columns of content? A navigation menu?), and embed content such as images and videos into a page.
But what HTML does not do is speficy how these elements should look. That is where CSS comes in.

CSS can be used for very basic document text styling — for example changing the color and size of headings and links. It can be used to create layout — for example turning a single column of text into a layout with a main content area and a sidebar for related information. It can even be used for effects such as animation.
In Chatty-pub we're mostly interested in the first part.

## Rules

#### _Elements and Classes_

In this section we will talk about CSS in general. Chatty-pub uses a slight variation on it, but let's start with the basics.

CSS is a rule-based language — you define rules specifying groups of styles that should be applied to particular elements or groups of elements on your web page. For example "I want the main heading on my page to be shown as large red text."

The following code shows a very simple CSS rule that would achieve the styling described above:

```css
h1 {
  color: red;
  font-size: 5em;
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

<!-- As said, in this example we're selecting a ```H1``` (Heading 1) to style, but there are other ways to select elements. In **Chatty-pub** specifically we use something called a class. A class is a propery you can add to HTML elements, and if you write a CSS selector for that class, the rules in the class will be apply to each element that
has that class.  -->

## CSS in Chatty-pub

When you react to a message in Zulip with an emoji, this emoji gets turned into a class in **Chatty-pub**. So lets say you responded to a message with the strawberry 🍓 emoji. In **Chatty-Pub** the message will have class with that emoji as selector. (You can confirm this by rolling over the message, the emoji should popup on a overlay.) So now to style that message, you go to the #rules channel and add a message with the following content:

```css
🍓 {
  color: red;
}
```

It is very similar to the examples above. `🍓` is the selector, so the rule will apply to each message with a strawberry reaction. Then follows the block `{` and `}`. And in the block, there is property, `color: red;`.

_A small difference with regular CSS is that you don't need to add the period in front of the selector **Chatty-pub** will handle that for you._

Because of the way Zulip handles the emoji reactions, not all emoji are available or sometimes they don't exactly correspond to the emoji you might type in the #rules channel. To help with sorting this out you can roll over a message in **Chatty-pub** and see the reactions that are applied. Sometimes the translation is unavailable, in that case you'll see something like `:working_on_it:` instead of the emoji you expected. In that case remove your reaction and find an other emoji that does work.

### About formatting

You can't enter a tab character in Zulip and the indentation before the property in the rule isn't absolutely necessary. So feel free to leave it out. If you absolutely want to have the indentation, you could write the rule in your favorite editor and copy and paste it into Zulip. If you only want to style a single property you could have the whole rule on a single line like this: `🌕 { box-shadow: 0 0 20px rgba(255,0,0,0.5); }`,

_Don't forget the semi-colon at the end of the property line!_.

## List of common and handy CSS properties

There are hundreds of CSS properties, so I can't list them all here. Below is a small selection of some basic properties grouped by module. Most of them are self explainatory, otherwise I've added a small note.

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

- TBD/Todo

### Text

- [letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing) - The letter-spacing CSS property sets the horizontal spacing behavior between text characters.
- [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) - The text-align CSS property sets the horizontal alignment of the content inside a block element.
- [text-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform) - The text-transform CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized.
- [white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) - The white-space CSS property sets how white space inside an element is handled.
- [word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break) - The word-break CSS property sets whether line breaks appear wherever the text would otherwise overflow its content box.
- [word-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing) - The word-spacing CSS property sets the length of space between words and between tags.

### Transforms

- [rotate](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate) - The rotate CSS property allows you to specify rotation of elements
- [scale](https://developer.mozilla.org/en-US/docs/Web/CSS/scale) - The scale CSS property allows you to specify the scale (size) of elements
- [translate](https://developer.mozilla.org/en-US/docs/Web/CSS/translate) - The translate CSS property allows you to specify translation transforms (position relative to where it originally was) of elements.

## Typing Emoji

- [Windows](https://support.microsoft.com/en-us/windows/windows-10-keyboard-tips-and-tricks-588e0b72-0fff-6d3f-aeee-6e5116097942)
- [Mac](https://www.howtogeek.com/684025/how-to-type-emoji-on-your-mac-with-a-keyboard-shortcut/)
- Linux varies per distribution. If you run Linux you're probably capable of finding out how :)

<a name="footnote1">1</a>: I've borrowed shamelessly from Mozilla to make this text: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS and https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML
