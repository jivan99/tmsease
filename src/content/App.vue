<script setup>
import users from "@/../users.json";
import profile from "@/assets/profile.png";
const avatar = browser.runtime.getURL(profile);

import CheckIcon from "~icons/radix-icons/check";
import CaretSortIcon from "~icons/radix-icons/caret-sort";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

const container = document.getElementById("tms-ease");

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const open = ref(true);
const selectedUser = ref(null);

function onUserSelection(user) {
  selectedUser.value = user;
  open.value = false;
}
</script>

<template>
  <div class="relative -top-[100px]">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded="open"
          aria-label="Select a user"
          :class="
            cn('w-[250px] justify-between font-normal', $attrs.class ?? '')
          "
        >
          <template v-if="selectedUser">
            <Avatar class="mr-2 h-5 w-5">
              <AvatarImage :src="avatar" :alt="selectedUser.label" />
            </Avatar>
            {{ selectedUser.label }}
          </template>
          <template v-else>Select a user...</template>
          <CaretSortIcon class="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent :to="container" class="w-[250px] p-0">
        <Command
          :filter-function="
            (list, term) =>
              list.filter((i) => i.label?.toLowerCase()?.includes(term))
          "
        >
          <CommandList>
            <CommandInput placeholder="Search user..." />
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup v-for="user in users" :key="user.username">
              <CommandItem
                :value="user"
                class="text-sm"
                @select="onUserSelection(user)"
              >
                <Avatar class="mr-2 h-5 w-5">
                  <AvatarImage
                    :src="avatar"
                    :alt="user.label"
                    class="grayscale"
                  />
                </Avatar>
                {{ user.label }}
                <CheckIcon
                  v-if="selectedUser"
                  :class="
                    cn(
                      'ml-auto h-4 w-4',
                      selectedUser.username === user.username
                        ? 'opacity-100'
                        : 'opacity-0'
                    )
                  "
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>

<style scoped>
  button:focus {
    outline: 1px dotted !important;
  }
</style>
