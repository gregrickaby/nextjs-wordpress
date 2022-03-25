import {SettingsFields} from '~/lib/types'

export default function Footer(props: SettingsFields) {
  return (
    <footer>
      &copy; {new Date().getFullYear()} - {props?.title} - {props?.description}
    </footer>
  )
}
