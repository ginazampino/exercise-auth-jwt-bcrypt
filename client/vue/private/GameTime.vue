<template>
    <div class="clock">
        {{ time }} Server Time
    </div>
</template>


<script>
    export default {
        data() {
            return {
                interval: null,
                time: null
            }
        },

        beforeDestroy() {
            clearInterval(this.interval);
        },

        created() {
            this.time = new Date().toISOString().slice(11, 19);

            function leadingZeroes(value) {
                if (value < 10) {
                    return '0' + value;
                } else return value;
            };

            this.interval = setInterval(() => {
                let hours = leadingZeroes(new Date().getUTCHours());
                let minutes = leadingZeroes(new Date().getUTCMinutes());
                let seconds = leadingZeroes(new Date().getUTCSeconds());

                this.time = `${hours}:${minutes}:${seconds}`
            }, 1000);
        }
    }
</script>
