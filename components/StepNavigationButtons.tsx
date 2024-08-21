'use client'

import { navigationButtonProps } from "@/lib/utils"
import { Button, Group } from "@mantine/core"



const StepNavigationButtons = ({activeStep, handleBack, handleNext, resetMnemonic, steps}: navigationButtonProps) => {
  return (
    <Group align="center" justify="center" mt="xl">
    {activeStep !== 0 && (
      <Button
        size="md"
        variant="light"
        color="blue"
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        Back
      </Button>
    )}
    <Button
      size="md"
      variant="light"
      color="blue"
      onClick={handleNext}
      disabled={activeStep === steps.length - 1}
    >
      Next
    </Button>
    {activeStep === steps.length - 1 && (
      <Button size="md" variant="light" color="red" onClick={resetMnemonic}>
        Reset Mnemonic
      </Button>
    )}
  </Group>
  )
}

export default StepNavigationButtons