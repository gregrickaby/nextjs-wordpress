import {SettingsFields} from '~/lib/types'

export default function Footer(props: SettingsFields) {
  return (
    <footer className="border-t-2 pt-8 text-center lg:text-base">
      &copy; {new Date().getFullYear()} - {props?.title} - {props?.description}
    </footer>
  )
}
