'use client'

import AnnouncementForm from '@rkr/dls/components/organisms/announcementForm'
import { useToast } from '@rkr/dls/hooks/useToast'
import { useUpdateAnnouncement } from '../../../hooks/useUpdateAnnouncement'

interface AnnouncementFormProps {
  initialTitle: string
  initialSubtitle: string
  initialIsActive: boolean
}

export default function AnnouncementFormContainer({
  initialTitle,
  initialSubtitle,
  initialIsActive,
}: AnnouncementFormProps) {
  const { mutate, isPending } = useUpdateAnnouncement()
  const { showToast } = useToast()

  return (
    <AnnouncementForm
      initialIsActive={initialIsActive}
      initialSubtitle={initialSubtitle}
      initialTitle={initialTitle}
      isPending={isPending}
      onSubmit={(data) =>
        mutate(data, {
          onSuccess: () => showToast('Announcement saved.', 'success'),
          onError: () => showToast('Error saving, please try again.'),
        })
      }
    />
  )
}
