# roux-templates

Project starter templates cloned by [`rouxui create`](https://rouxui.com) via
[degit](https://github.com/Rich-Harris/degit).

## Structure

```
templates/
  nextjs/<router>/<base|cms>/<app-type>/<orm>/   # e.g. nextjs/app-router/cms/hair-salon/prisma
  expo/<styling>/<base|cms>/<app-type>/          # e.g. expo/nativewind/cms/e-commerce-store
```

`rouxui create` builds the template key from the user's selections and clones the
matching directory. If it doesn't exist yet, the CLI falls back to the platform
**base** template:

- `nextjs/app-router/base` ✅ (working)
- `expo/nativewind/base` ✅ (working)

All other variants are being filled in over time — contributions welcome.
