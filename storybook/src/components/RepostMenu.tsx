import { useState } from "react";
import { Button, YStack, Popover } from "tamagui";
import { Repeat2, Quote } from "@tamagui/lucide-icons";
import AnimatedNumber from "./AnimatedNumber";
import { formatCount } from "./utils";

export type RepostMenuProps = {
  isReposted: boolean;
  repostCount: number;
  repostColor: string;
  repostFontWeight: string;
  iconSize: number;
  onRepostPress: () => void;
  onQuotePress: () => void;
  disabled?: boolean;
  placement?: "top" | "bottom";
  buttonWidth?: number;
};

export default function RepostMenu({
  isReposted,
  repostCount,
  repostColor,
  repostFontWeight,
  iconSize,
  onRepostPress,
  onQuotePress,
  disabled = false,
  placement = "bottom",
  buttonWidth,
}: RepostMenuProps) {
  const [open, setOpen] = useState(false);

  const handleRepost = () => {
    onRepostPress();
    setOpen(false);
  };

  const handleQuote = () => {
    onQuotePress();
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      placement={placement}
      offset={8}
      stayInFrame
    >
      <Popover.Trigger asChild>
        <Button
          size="$3"
          chromeless
          borderWidth={0}
          disabled={disabled}
          pressStyle={{ opacity: 0.7 }}
          style={buttonWidth ? { width: buttonWidth } : undefined}
        >
          <YStack
            gap="$1"
            flexDirection="row"
            style={{ alignItems: "center" }}
          >
            <Repeat2
              size={iconSize}
              color={repostColor as any}
              strokeWidth={isReposted ? 2.5 : 2}
            />
            {repostCount > 0 && (
              <AnimatedNumber
                value={repostCount}
                color={repostColor}
                fontSize={14}
                fontWeight={repostFontWeight as any}
                formatter={formatCount}
              />
            )}
          </YStack>
        </Button>
      </Popover.Trigger>
      <Popover.Content
        borderWidth={1}
        elevation={3}
        style={{
          borderRadius: 8,
          borderColor: "#eee",
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOpacity: 0.07,
          shadowRadius: 7,
          padding: 0,
        }}
      >
        <YStack>
          <Button
            chromeless
            borderWidth={0}
            onPress={handleRepost}
            disabled={disabled}
            style={{ paddingHorizontal: 20, paddingVertical: 12 }}
            icon={() => (
              <Repeat2
                size={20}
                color={repostColor as any}
                strokeWidth={2}
                style={{ marginRight: 10 }}
              />
            )}
          >
            {isReposted ? "Undo repost" : "Repost"}
          </Button>
          <Button
            chromeless
            borderWidth={0}
            onPress={handleQuote}
            disabled={disabled}
            style={{ paddingHorizontal: 20, paddingVertical: 12 }}
            icon={() => (
              <Quote size={20} color="#222" style={{ marginRight: 10 }} />
            )}
          >
            Quote
          </Button>
        </YStack>
      </Popover.Content>
    </Popover>
  );
}
