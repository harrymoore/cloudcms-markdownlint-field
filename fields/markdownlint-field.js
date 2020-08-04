(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.MarkdownLintField = Alpaca.Fields.TextAreaField.extend(
    {
        getFieldType: function() {
            return "markdownlint";
        },

        setup: function()
        {
            var self = this;

            self.base();
        },

        initMarkdownEditorEvents: function()
        {
            var self = this;

            self.base();

            if (self.editor)
            {
                self.editor.codemirror.on("changes", function(instance, changeObj) {
                    self.autoFix();
                    // self.triggerWithPropagation("before_nested_change", instance);
                });

                // self.editor.codemirror.on("beforeChange", function(e) {
                //     self.triggerWithPropagation("before_nested_change", e);
                // });

                // self.editor.codemirror.on("beforeChange", function(instance, changeObj) {
                //     self.autoFix();
                //     self.triggerWithPropagation("before_nested_change", instance);
                // });

            // self.editor.codemirror.on('blur', function (e) {
            //     self.onBlur();
            //     self.trigger("blur", e);
            // });
            }
        },

        autoFix: function() {
            var self = this;
            var rules = self.rules; // if autofix is true then apply all rules by default
            
            if (!Alpaca.isEmpty(self.options.markdown.autofix) && Alpaca.isBoolean(self.options.markdown.autofix) && self.options.markdown.autofix)
            {
                console.log("Changes to markdown " + self.getControlValue());

                if (!Alpaca.isEmpty(self.options.markdown.autofixRules) && Alpaca.isArray(self.options.markdown.autofixRules))
                {
                    console.log("Changes to markdown " + self.getControlValue());

                    // apply specified rules only
                    rules = Array.from(self.options.markdown.autofixRules)
                        .filter(rule => { return typeof self.rules[rule] === 'function' })
                        .map(rule => { return self.rules[rule] });
                }
    
                // apply every rule
                Object.values(rules).forEach(rule => {
                    rule(self);
                });

            }
        },

        rules: {
            MD037: function(self) {
                // Spaces inside emphasis markers                
                console.log("MD037 " + self.getControlValue());
            },
            MD038: function(self) {
                // Spaces inside code span elements
                console.log("MD038 " + self.getControlValue());
            }
        },

        afterRenderControl: function(model, callback)
        {
            var self = this;

            self.base(model, callback);
        },

        setValue: function(value)
        {
            var self = this;

            // be sure to call into base method
            self.base(value);

            // if (self.editor)
            // {
            //     if (!value)
            //     {
            //         self.editor.value("");
            //     }
            //     else
            //     {
            //         self.editor.value(value);
            //     }
            // }
        },

        getTitle: function() {
            return "Markdown Lint Editor";
        },

        getDescription: function() {
            return "Provides an instance of a Markdown Editor control with auto-fix linting options.";
        },
    });

    Alpaca.registerFieldClass(Alpaca.Fields.MarkdownLintField.getFieldType(), Alpaca.Fields.MarkdownLintField);

})(jQuery);