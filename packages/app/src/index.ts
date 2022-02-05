import m from "mithril";

var Home = {
    view: function() {
        return "Welcome"
    }
}


m.route.prefix = ''

/**
 * @type {m.Route}
 */
m.route(document.body, '/', {

    /* INDEX -------------------------------------- */
  
    '/': Home
})
// m.render(document.body, "sweet world")