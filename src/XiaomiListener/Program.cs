using System;
using System.Threading.Tasks;
using Microsoft.Azure.Devices.Client;

namespace XiaomiListener
{
    public class Program
    {
        private static string s_deviceConnectionString = Environment.GetEnvironmentVariable("IOTHUB_DEVICE_CONN_STRING");
        private static TransportType s_transportType = TransportType.Mqtt;
        public static async Task Main(string[] args)
        {
            var deviceClient = DeviceClient.CreateFromConnectionString(s_deviceConnectionString, s_transportType);
            if (deviceClient == null)
            {
                Console.WriteLine("Failed to create DeviceClient!");
                return;
            }
            await new MessageSender(deviceClient).SendTest();
        }
    }
}
