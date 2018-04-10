const get = require('lodash/get');
const trim = require('lodash/trim');
const toStyleString = require('to-style').string

function minifyHtml(content) {
    return content
        .replace(/\r?\n|\r/g, '')
        .replace(/[\t ]+\</g, "<")
        .replace(/\>[\t ]+\</g, "><")
        .replace(/\>[\t ]+$/g, ">");
}

module.exports = {

    // Extend ebook resources and html
    website: {
        assets: './book',
        css: [
            'plugin.css'
        ],
    },
    book: {
        assets: './book',
        css: [
            'plugin.css'
        ],
    },

    ebook: {
        assets: './book',
        css: [
            'plugin.css'
        ],
    },

    // Extend templating blocks
    blocks: {
        httpverb: {
            process: function (block) {
                const ctx = this;
                const opts = ctx.book.config.get('pluginsConfig.http-verb');

                const verb = trim(get(block, 'kwargs.verb', '') || get(block, 'args[0]', '') || 'get');
                const style = toStyleString(get(opts, `styles.${verb}`));

                return this.renderBlock('markdown', trim(block.body || '')).then((str) => {
                    return minifyHtml(`
                        <div class="gbhv-verbpath">
                            <span class="gbhv-verb gbhv-${verb.toLowerCase()}"${style ? ` style="${style}"` : ''}>
                                ${verb.toUpperCase()}
                            </span>
                            <span class="gbhv-path">${str}</span>
                        </div>
                    `);
                })
            }
        }
    },
};
