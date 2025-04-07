import { e as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_JhCfhjtA.mjs';
import 'clsx';

const frontmatter = {
  "title": "Sample Web Development Sketch",
  "date": "240417",
  "description": "A demonstration of the sketches feature using a simple web component",
  "category": "webdev",
  "tags": ["javascript", "html", "css", "demo"],
  "status": "completed",
  "thumbnail": "/images/sketches/sample-sketch-thumb.png",
  "liveUrl": "https://example.com/demo"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "interactive-web-component-demo",
    "text": "Interactive Web Component Demo"
  }, {
    "depth": 2,
    "slug": "how-this-works",
    "text": "How This Works"
  }];
}
function _createMdxContent(props) {
  const _components = {
    code: "code",
    h2: "h2",
    p: "p",
    pre: "pre",
    span: "span",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "interactive-web-component-demo",
      children: "Interactive Web Component Demo"
    }), "\n", createVNode(_components.p, {
      children: "This is a sample sketch demonstrating the sketches feature.\nIn a real sketch, you would include more detailed content and possibly embed interactive components."
    }), "\n", createVNode(_components.pre, {
      class: "language-html",
      "data-language": "html",
      children: createVNode(_components.code, {
        "is:raw": "",
        class: "language-html",
        children: [createVNode(_components.span, {
          class: "token comment",
          children: "<!-- Example HTML component -->"
        }), "\n", createVNode(_components.span, {
          class: "token tag",
          children: [createVNode(_components.span, {
            class: "token tag",
            children: [createVNode(_components.span, {
              class: "token punctuation",
              children: "<"
            }), "div"]
          }), " ", createVNode(_components.span, {
            class: "token attr-name",
            children: "class"
          }), createVNode(_components.span, {
            class: "token attr-value",
            children: [createVNode(_components.span, {
              class: "token punctuation attr-equals",
              children: "="
            }), createVNode(_components.span, {
              class: "token punctuation",
              children: "\""
            }), "interactive-component", createVNode(_components.span, {
              class: "token punctuation",
              children: "\""
            })]
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ">"
          })]
        }), "\n  ", createVNode(_components.span, {
          class: "token tag",
          children: [createVNode(_components.span, {
            class: "token tag",
            children: [createVNode(_components.span, {
              class: "token punctuation",
              children: "<"
            }), "h2"]
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ">"
          })]
        }), "Interactive Component", createVNode(_components.span, {
          class: "token tag",
          children: [createVNode(_components.span, {
            class: "token tag",
            children: [createVNode(_components.span, {
              class: "token punctuation",
              children: "</"
            }), "h2"]
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ">"
          })]
        }), "\n  ", createVNode(_components.span, {
          class: "token tag",
          children: [createVNode(_components.span, {
            class: "token tag",
            children: [createVNode(_components.span, {
              class: "token punctuation",
              children: "<"
            }), "button"]
          }), " ", createVNode(_components.span, {
            class: "token attr-name",
            children: "id"
          }), createVNode(_components.span, {
            class: "token attr-value",
            children: [createVNode(_components.span, {
              class: "token punctuation attr-equals",
              children: "="
            }), createVNode(_components.span, {
              class: "token punctuation",
              children: "\""
            }), "demo-button", createVNode(_components.span, {
              class: "token punctuation",
              children: "\""
            })]
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ">"
          })]
        }), "Click Me!", createVNode(_components.span, {
          class: "token tag",
          children: [createVNode(_components.span, {
            class: "token tag",
            children: [createVNode(_components.span, {
              class: "token punctuation",
              children: "</"
            }), "button"]
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ">"
          })]
        }), "\n  ", createVNode(_components.span, {
          class: "token tag",
          children: [createVNode(_components.span, {
            class: "token tag",
            children: [createVNode(_components.span, {
              class: "token punctuation",
              children: "<"
            }), "div"]
          }), " ", createVNode(_components.span, {
            class: "token attr-name",
            children: "id"
          }), createVNode(_components.span, {
            class: "token attr-value",
            children: [createVNode(_components.span, {
              class: "token punctuation attr-equals",
              children: "="
            }), createVNode(_components.span, {
              class: "token punctuation",
              children: "\""
            }), "output", createVNode(_components.span, {
              class: "token punctuation",
              children: "\""
            })]
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ">"
          })]
        }), createVNode(_components.span, {
          class: "token tag",
          children: [createVNode(_components.span, {
            class: "token tag",
            children: [createVNode(_components.span, {
              class: "token punctuation",
              children: "</"
            }), "div"]
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ">"
          })]
        }), "\n", createVNode(_components.span, {
          class: "token tag",
          children: [createVNode(_components.span, {
            class: "token tag",
            children: [createVNode(_components.span, {
              class: "token punctuation",
              children: "</"
            }), "div"]
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ">"
          })]
        }), "\n"]
      })
    }), "\n", createVNode(_components.pre, {
      class: "language-css",
      "data-language": "css",
      children: createVNode(_components.code, {
        "is:raw": "",
        class: "language-css",
        children: [createVNode(_components.span, {
          class: "token comment",
          children: "/* Example CSS */"
        }), "\n", createVNode(_components.span, {
          class: "token selector",
          children: ".interactive-component"
        }), " ", createVNode(_components.span, {
          class: "token punctuation",
          children: "{"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "padding"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " 20px", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "border"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " 1px solid #ccc", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "border-radius"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " 4px", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "margin-top"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " 20px", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n", createVNode(_components.span, {
          class: "token punctuation",
          children: "}"
        }), "\n\n", createVNode(_components.span, {
          class: "token selector",
          children: "#demo-button"
        }), " ", createVNode(_components.span, {
          class: "token punctuation",
          children: "{"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "background"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " #0070f3", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "color"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " white", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "border"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " none", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "padding"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " 8px 16px", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "border-radius"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " 4px", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "cursor"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " pointer", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n", createVNode(_components.span, {
          class: "token punctuation",
          children: "}"
        }), "\n\n", createVNode(_components.span, {
          class: "token selector",
          children: "#demo-button:hover"
        }), " ", createVNode(_components.span, {
          class: "token punctuation",
          children: "{"
        }), "\n  ", createVNode(_components.span, {
          class: "token property",
          children: "background"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ":"
        }), " #005cdd", createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n", createVNode(_components.span, {
          class: "token punctuation",
          children: "}"
        }), "\n"]
      })
    }), "\n", createVNode(_components.pre, {
      class: "language-javascript",
      "data-language": "javascript",
      children: createVNode(_components.code, {
        "is:raw": "",
        class: "language-javascript",
        children: [createVNode(_components.span, {
          class: "token comment",
          children: "// Example JavaScript"
        }), "\ndocument", createVNode(_components.span, {
          class: "token punctuation",
          children: "."
        }), createVNode(_components.span, {
          class: "token function",
          children: "addEventListener"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: "("
        }), createVNode(_components.span, {
          class: "token string",
          children: "'DOMContentLoaded'"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ","
        }), " ", createVNode(_components.span, {
          class: "token punctuation",
          children: "("
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ")"
        }), " ", createVNode(_components.span, {
          class: "token operator",
          children: "=>"
        }), " ", createVNode(_components.span, {
          class: "token punctuation",
          children: "{"
        }), "\n  ", createVNode(_components.span, {
          class: "token keyword",
          children: "const"
        }), " button ", createVNode(_components.span, {
          class: "token operator",
          children: "="
        }), " document", createVNode(_components.span, {
          class: "token punctuation",
          children: "."
        }), createVNode(_components.span, {
          class: "token function",
          children: "getElementById"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: "("
        }), createVNode(_components.span, {
          class: "token string",
          children: "'demo-button'"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ")"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  ", createVNode(_components.span, {
          class: "token keyword",
          children: "const"
        }), " output ", createVNode(_components.span, {
          class: "token operator",
          children: "="
        }), " document", createVNode(_components.span, {
          class: "token punctuation",
          children: "."
        }), createVNode(_components.span, {
          class: "token function",
          children: "getElementById"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: "("
        }), createVNode(_components.span, {
          class: "token string",
          children: "'output'"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ")"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  \n  ", createVNode(_components.span, {
          class: "token keyword",
          children: "let"
        }), " clickCount ", createVNode(_components.span, {
          class: "token operator",
          children: "="
        }), " ", createVNode(_components.span, {
          class: "token number",
          children: "0"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  \n  button", createVNode(_components.span, {
          class: "token punctuation",
          children: "."
        }), createVNode(_components.span, {
          class: "token function",
          children: "addEventListener"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: "("
        }), createVNode(_components.span, {
          class: "token string",
          children: "'click'"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ","
        }), " ", createVNode(_components.span, {
          class: "token punctuation",
          children: "("
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ")"
        }), " ", createVNode(_components.span, {
          class: "token operator",
          children: "=>"
        }), " ", createVNode(_components.span, {
          class: "token punctuation",
          children: "{"
        }), "\n    clickCount", createVNode(_components.span, {
          class: "token operator",
          children: "++"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n    output", createVNode(_components.span, {
          class: "token punctuation",
          children: "."
        }), "textContent ", createVNode(_components.span, {
          class: "token operator",
          children: "="
        }), " ", createVNode(_components.span, {
          class: "token template-string",
          children: [createVNode(_components.span, {
            class: "token template-punctuation string",
            children: "`"
          }), createVNode(_components.span, {
            class: "token string",
            children: "Button clicked "
          }), createVNode(_components.span, {
            class: "token interpolation",
            children: [createVNode(_components.span, {
              class: "token interpolation-punctuation punctuation",
              children: "${"
            }), "clickCount", createVNode(_components.span, {
              class: "token interpolation-punctuation punctuation",
              children: "}"
            })]
          }), createVNode(_components.span, {
            class: "token string",
            children: " time"
          }), createVNode(_components.span, {
            class: "token interpolation",
            children: [createVNode(_components.span, {
              class: "token interpolation-punctuation punctuation",
              children: "${"
            }), "clickCount ", createVNode(_components.span, {
              class: "token operator",
              children: "==="
            }), " ", createVNode(_components.span, {
              class: "token number",
              children: "1"
            }), " ", createVNode(_components.span, {
              class: "token operator",
              children: "?"
            }), " ", createVNode(_components.span, {
              class: "token string",
              children: "''"
            }), " ", createVNode(_components.span, {
              class: "token operator",
              children: ":"
            }), " ", createVNode(_components.span, {
              class: "token string",
              children: "'s'"
            }), createVNode(_components.span, {
              class: "token interpolation-punctuation punctuation",
              children: "}"
            })]
          }), createVNode(_components.span, {
            class: "token string",
            children: "!"
          }), createVNode(_components.span, {
            class: "token template-punctuation string",
            children: "`"
          })]
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n  ", createVNode(_components.span, {
          class: "token punctuation",
          children: "}"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ")"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n", createVNode(_components.span, {
          class: "token punctuation",
          children: "}"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ")"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n"]
      })
    }), "\n", createVNode(_components.h2, {
      id: "how-this-works",
      children: "How This Works"
    }), "\n", createVNode(_components.p, {
      children: "In a real sketch, you might include explanations of your code, implementation details, or design decisions.\nYou can also embed interactive components from your components directory."
    }), "\n", createVNode(_components.p, {
      children: ["For example, if you had a component at ", createVNode(_components.code, {
        children: "src/components/sketches/DemoComponent.vue"
      }), ", you could import and use it like this:"]
    }), "\n", createVNode(_components.pre, {
      class: "language-jsx",
      "data-language": "jsx",
      children: createVNode(_components.code, {
        "is:raw": "",
        class: "language-jsx",
        children: [createVNode(_components.span, {
          class: "token keyword",
          children: "import"
        }), " DemoComponent ", createVNode(_components.span, {
          class: "token keyword",
          children: "from"
        }), " ", createVNode(_components.span, {
          class: "token string",
          children: "'@components/sketches/DemoComponent.vue'"
        }), createVNode(_components.span, {
          class: "token punctuation",
          children: ";"
        }), "\n\n", createVNode(_components.span, {
          class: "token tag",
          children: [createVNode(_components.span, {
            class: "token tag",
            children: [createVNode(_components.span, {
              class: "token punctuation",
              children: "<"
            }), createVNode(_components.span, {
              class: "token class-name",
              children: "DemoComponent"
            })]
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "/>"
          })]
        }), "\n"]
      })
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/sketches/webdev/2025/250417-sample-sketch.mdx";
const file = "/home/matsu/Desktop/jy/src/content/sketches/webdev/2025/250417-sample-sketch.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/matsu/Desktop/jy/src/content/sketches/webdev/2025/250417-sample-sketch.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
