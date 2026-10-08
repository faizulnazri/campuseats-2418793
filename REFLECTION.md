# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
   = In imperative UI, we tell the browser step by step on how to create and update the page. While in React, we describe what the UI should look like based on the data or state, and React will handle the updates.

2. Why must a component name start with a capital letter?
   = A component name must start with a capital letter so React can recognise it as a custom component instead of a normal HTML element. For example, Welcome is handled as a React component, while div is handled as an HTML element.

3. What does a fragment <>...</> do, and why not just use a <div>?
   = A fragment <>...</> allows us to return multiple elements as one group without adding an extra element to the page. It can be used instead of a <div> when we only need to group elements.

4. Name one benefit of splitting the UI into small components.
   = One benefit is that components can be reused in different parts of the application. So, this can reduces repeated code and makes the UI easier to manage.
