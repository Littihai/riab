"use client"

import { IconAlertCircle, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"

import { useLocale } from "@/components/locale-provider"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york-v4/ui/alert"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import { Separator } from "@/registry/new-york-v4/ui/separator"

export function FormScreen() {
  const { t } = useLocale()
  const s = t.screens.form

  return (
    <div className="grid overflow-hidden rounded-lg border bg-background text-foreground lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary p-8 text-primary-foreground lg:flex">
        <div className="text-sm font-semibold">riab-ui</div>
        <blockquote className="flex flex-col gap-2">
          <p className="text-lg leading-snug text-balance">{s.quote}</p>
          <footer className="text-sm opacity-80">{s.quoteAuthor}</footer>
        </blockquote>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <form
          className="flex w-full max-w-sm flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="text-sm text-muted-foreground">{s.description}</p>
          </div>

          <Alert variant="destructive">
            <IconAlertCircle />
            <AlertTitle>{s.errorTitle}</AlertTitle>
            <AlertDescription>{s.errorDescription}</AlertDescription>
          </Alert>

          <div className="grid gap-2">
            <Label htmlFor="screen-email">{s.email}</Label>
            <Input
              id="screen-email"
              type="email"
              defaultValue="riab@example.com"
              autoComplete="off"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="screen-password">{s.password}</Label>
              <span className="text-xs text-primary underline-offset-4 hover:underline">
                {s.forgot}
              </span>
            </div>
            <Input
              id="screen-password"
              type="password"
              defaultValue="password"
              aria-invalid
              autoComplete="off"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="screen-remember" defaultChecked />
            <Label htmlFor="screen-remember" className="font-normal">
              {s.remember}
            </Label>
          </div>
          <Button type="submit" className="w-full">
            {s.submit}
          </Button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Separator className="flex-1" />
            {s.or}
            <Separator className="flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline">
              <IconBrandGoogle />
              {s.google}
            </Button>
            <Button type="button" variant="outline">
              <IconBrandGithub />
              {s.github}
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {s.noAccount}{" "}
            <span className="font-medium text-primary underline-offset-4 hover:underline">
              {s.signUp}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
