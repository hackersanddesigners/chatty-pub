# CSS

## What is CSS?

CSS (Cascading Style Sheets) is the language that allows you to style and layout HTML web pages. This article explains what CSS is, with some simple syntax examples, and also covers some key terms about the language.

Since this document relates specifically to **Chatty-pub**, the focus is going to be on the parts of the language that are supported by this platform. Because CSS is specifically oriented towards styling HTML (and related languages like SVG and XML) you have to have a basic understanding of HTML.[^1] Mozilla has an excellent [HTML introduction](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started).

At its heart, HTML is a fairly simple language made up of elements, which can be applied to pieces of text to give them different meaning in a document (Is it a paragraph? Is it a bulleted list? Is it part of a table?), structure a document into logical sections (Does it have a header? Three columns of content? A navigation menu?), and embed content such as images and videos into a page.
But what HTML does not do is speficy how these elements should look. That is where CSS comes in.

CSS can be used for very basic document text styling — for example changing the color and size of headings and links. It can be used to create layout — for example turning a single column of text into a layout with a main content area and a sidebar for related information. It can even be used for effects such as animation.
In Chatty-pub we're mostly interested in the first part.

### Rules

#### _Elements and Classes_

In this section we will talk about CSS in general. Chatty-pub uses a slight variation on it, but it is good to know the basics, right?

CSS is a rule-based language — you define rules specifying groups of styles that should be applied to particular elements or groups of elements on your web page. For example "I want the main heading on my page to be shown as large red text."

The following code shows a very simple CSS rule that would achieve the styling described above:

```lang-css
h1 {
    color: red;
    font-size: 5em;
}
```

The rule opens with a selector. This selects the HTML element that we are going to style. In this case we are styling all level one headings (`<h1>`) that appear on the page.

We then have a set of curly braces `{` `}`. Inside those will be one or more declarations, which take the form of property and value pairs. Each pair specifies a property of the element(s) we are selecting, then a value that we'd like to give the property.

Before the colon, we have the property, and after the colon, the value. CSS properties have different allowable values, depending on which property is being specified. In our example, we have the color property, which can take various color values. We also have the font-size property. This property can take various size units as a value.

The example above will style all the `H1` elements on the page. You could also write a selector for all paragraphs (the selector would be `p`), images (`img`) or list items (`li`). This works as long as you want all of the elements of that type in your document to look the same. Most of the time that isn't the case and so you will need to find a way to select a subset of the elements without changing the others. The most common way to do this is to add a class to your HTML element and target that class.

```lang=html
<ul>
  <li>Item one</li>
  <li class="special">Item two</li>
  <li>Item <em>three</em></li>
</ul>
```

To target the class of special you can create a selector that starts with a full stop character.

```lang=css
.special {
  color: orange;
  font-weight: bold;
}
```

You can apply the class of special to any element on your page that you want to have the same look as this list item.

<!-- As said, in this example we're selecting a ```H1``` (Heading 1) to style, but there are other ways to select elements. In **Chatty-pub** specifically we use something called a class. A class is a propery you can add to HTML elements, and if you write a CSS selector for that class, the rules in the class will be apply to each element that
has that class.  -->

## CSS in Chatty-pub

When you react to a message in Zulip with an emoji, this emoji gets turned into a class in **Chatty-pub**. So lets say you responded to a message with the strawberry 🍓 emoji. In **chatty-Pub** the message will have class with that emoji as selector. So now to style that message, you go to the #rules channel and add a message with the following content:

```lang=css
🍓 {
  color: red;
}
```

A small difference with regular CSS is that you don't need to add the period in front of the selector **Chatty-pub** will handle that for you.

TODO:
Not all emoji are available or mapped differently

## List of CSS properties

## Typing Emoji

- On Windows
- On Mac

[^1]: I've borrowed shamelessly from Mozilla to make this text: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS and https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML
